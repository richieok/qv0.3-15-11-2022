import { redirect } from "@sveltejs/kit"
import { getDb } from "$lib/server/db"

const {db} = await getDb()
const collection = await db.collection('sessions')

export const load = async ({locals, fetch})=>{
    if (!(locals?.user?.id)){
        console.log('redirect from /app to /');
        throw redirect(300, '/')
    }
    // const cursor = collection.find({sessionId: locals.user.id})
    // if (cursor.length === 0){
    //     console.log("could't find sessionId");
    //     throw redirect(300, '/')
    // }
    const colls = await fetch('/api/getcolls', {
        method: 'POST'
    })
    const {payload} = await colls.json()
    // console.log(payload);
    return {collections: payload}
}