import {getDb} from "$lib/server/db.js"
import {redirect} from "@sveltejs/kit"
import bcrypt from "bcrypt"

export const actions = {
    default: async ({request})=>{
        const data = await request.formData()
        const username = data.get('username').toLowerCase()
        const firstname = data.get('firstname').toLowerCase()
        const lastname = data.get('lastname').toLowerCase()
        const email = data.get('email').toLowerCase()
        const password = data.get('password')
        let usersColl
        let emailCursor
        let usernameCursor
        let result
        try{
            const {db} = await getDb()
            usersColl = await db.collection('users')
            emailCursor = await usersColl.find({email}).toArray()
            usernameCursor = await usersColl.find({username}).toArray()

        }
        catch(e){
            console.log(e.message);
            return
        }
        if (emailCursor && emailCursor.length > 0){
            return {
                message: 'you already have an account'
            }
        }
        if (usernameCursor && usernameCursor.length){
            return {
                message: 'Username unavailable'
            }
        }
        //create user
        const newUser = {
            username,
            firstname,
            lastname,
            email,
            password: await bcrypt.hash(password, 10),
            created: new Date(),
            lastUpdated: new Date(),
        }
        try{
            result = await usersColl.insertOne(newUser)
            console.log(result);
        }
        catch (e){
            console.log(e.message)
        }
        if(result.insertedId){
            throw redirect(300, '/login')
        }
    }
}