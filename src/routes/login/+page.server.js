import { getDb } from "$lib/server/db.js"
import { redirect } from "@sveltejs/kit"
import bcrypt from "bcrypt"
import { retrieveSession, createSession } from "$lib/server/session.js"

const { db } = await getDb();
const usersColl = await db.collection('users');

export const load = async ({locals, route})=>{
    // console.log(locals.user);
    if (locals?.user?.id){
        console.log('/login has id');
        // throw redirect(300, '/')
    }
}

export const actions = {
    default: async ({request, locals, cookies})=>{
        if (!usersColl) {
            console.log('collection ', usersColl);
            return
        }
        const data = await request.formData()
        const email = data.get('email').toLowerCase()
        const password = data.get('password')
        const cursor = await usersColl.find({ email }).toArray()
        if (cursor.length === 0) {
            console.log('user not found');
            return
        }
        const match = await bcrypt.compare(password, cursor[0].password)
        if (!match) {
            console.log('password is incorrect');
            return
        }
        const sessionData = {
            email: cursor[0].email,
            firstname: cursor[0].firstname,
        }
        let session
        try{
            session = await createSession(sessionData)
        }
        catch(e){
            console.log(e.message);
            return
        }
        if (!session?.sessionId){
            console.log(session);
            console.log('Database error');
            return
        }
        cookies.set('sessionId', session.sessionId, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            maxAge: 60 * 5
        })
        throw redirect(300, '/app')
    }
}