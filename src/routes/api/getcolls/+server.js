import { json } from "@sveltejs/kit"
import { getDb } from "$lib/server/db.js"


export const POST = async ({request})=>{
    try {

    }
    catch (e){
        console.log(e.message);
    }
    const { db } = await getDb();
    const cursor = await db.listCollections()
    if (cursor.length === 0){
        return json({})
    }
    const clist = await cursor.toArray()
    const payload = clist.map((item, i)=> {
        return {
            index: i,
            name: item.name
        }
    })
    // console.log(clist);
    return json({payload})
}