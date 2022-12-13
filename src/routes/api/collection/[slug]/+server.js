import { json } from "@sveltejs/kit"
import { getDb } from "$lib/server/db.js"
import { ObjectId } from "mongodb";

export const POST = async ({params})=>{
    const {slug} = params;
    if (!slug){
        return json({})
    }
    const { db } = await getDb();
    const collection = await db.collection(slug)
    const all = await collection.find({}).toArray()
    if (slug === 'delete'){
        console.log(slug);
    }
    return json({message: 'delete'})
}

export const DELETE = async ({params, request})=>{
    const {slug} = params;
    const {list} = await request.json()
    const ids = list.map((item)=> ObjectId(item._id))
    // console.log(ids);
    const { db } = await getDb();
    const collection = await db.collection(slug)
    const result = await collection.deleteMany({_id: {
        $in: ids
    }})
    console.log(result);
    return json(result)
}

export const GET = async ({params, request})=>{
    let all = []
    let cookie
    try{
        const {slug} = params;
        if (!slug){
            return json({})
        }
        cookie = request.headers.get('cookie')
        if (cookie){
            const cookies = cookie.split(';').map(c => c.split('=')).reduce((acc, v) => {
                    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
                return acc;
            }, {});
            console.log(cookies);
            if (cookies.sessionId){
                const { db } = await getDb();
                const collection = await db.collection(slug)
                all = await collection.find({}).toArray()
            }
        }
    }
    catch (e){
        console.log(e.message);
    }
    finally {
        return json({
            list: all,
            count: all.length
        })
    }
}