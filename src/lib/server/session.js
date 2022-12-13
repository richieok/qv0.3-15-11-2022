import { v4 as uuidv4 } from 'uuid'
import { getDb } from './db.js';

let collection;
const {db} = await getDb()

export const SessionSchema = {
    $jsonSchema: {
        bsonType: "object",
        title: "Session Object Validation",
        required: ['sessionId', 'email', 'firstname'],
        properties: {
            sessionId: {
                bsonType: 'string',
            },
            // timeup: {
            //     bsonType: 'long',
            // },
            email: {
                bsonType: 'string'
            },
            firstname: {
                bsonType: 'string'
            }
        }
    }
}

export const createSession = async ({email, firstname})=>{
    const coll = await init()
    if (!coll){
        return null
    }
    console.log(typeof(Date.now() + 60 * 60 * 1000 * 2));
    const session = {
        sessionId: uuidv4(),
        timeup: Date.now() + 60 * 60 * 1000 * 2,
        email,
        firstname
    };
    console.log("New session: ", session.sessionId);
    const result = await coll.insertOne(session)
    console.log(result);
    return Promise.resolve(session);
}

export const retrieveSession = async (id)=>{
    const coll = await init()
    if (!coll){
        return null
    }
    const cursor = await coll.find({sessionId: id}).toArray()
    const session = cursor[0]
    return Promise.resolve(session)
}

export const updateSession = async ( sessionData)=>{
    try {
        await coll.updateOne({id: session.id},{$inc: {ttl: 7200 }})
        return Promise.resolve(true)
    }
    catch(e){
        console.log(`${e.name}. ${e.message}`);
    }
}

export const deleteSession = async (id)=>{
    const coll = await init()
    if (!coll){
        return null
    }
    try{
        console.log('Deleting Session');
        return await coll.deleteOne({sessionId: id})
    }
    catch(e){
        console.log(e.message);
    }
}

const init = async ()=>{
    if (collection){
        return collection
    }
    try {
        await db.createCollection('sessions', {
            validator: SessionSchema
        })
    }
    catch(e){
        console.log(e.message);
    }
    try{
        collection = await db.collection('sessions');
    }
    catch (e){
        console.log(e.message);
        return null
    }
    return collection
}

export const Session = {

}