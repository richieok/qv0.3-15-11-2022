import { MongoClient } from 'mongodb'
import {env} from "$env/dynamic/private"
import {DB_USER, DB_PWD, SERVER_LOCATION} from "$env/static/private"

let username
let password

console.log(DB_USER, DB_PWD, SERVER_LOCATION);


let client;
let db;

const init = async ()=>{
    try {
        if (SERVER_LOCATION && (SERVER_LOCATION === 'local')){
            username = DB_USER
            password = DB_PWD
        }
        if (username === undefined && password === undefined ){
            throw new Error('Database Username and Password undefined')
        }
        const DB_URI = `mongodb+srv://${username}:${password}@cluster0.z8ae8.mongodb.net/?retryWrites=true&w=majority`;
        console.log(DB_URI);
        client = new MongoClient(DB_URI, { useUnifiedTopology: true })
        console.log('creating client');
        // db = await client.db(dbName);
        db = await client.db();
        // collection = await db.collection('users');
    }
    catch(e){
        console.log(e.name);
        console.log(e.message);
        client = undefined
    }
}

export async function getDb(){
    if (!client){
        await init()
    }
    return { client, db }
}