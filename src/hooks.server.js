import { parse, serialize } from "cookie"
import { retrieveSession, deleteSession } from "$lib/server/session.js"

let securedRoutes = new Set(['api', 'app'])

export const handle = async ({ event, resolve })=>{
    console.log('hook');
    event.locals.user = {}
    const url = new URL(event.request.url)
    try {
        const id = event?.cookies?.get('sessionId')
        if (id){
            const session = await retrieveSession(id)
            if (session){
                event.locals.user.id = session.sessionId;
                event.locals.user.firstname = session.firstname;
                const expires = (session.timeup - Date.now())/1000
                console.log(`Session expires in ${expires} secs`);
                return resolve(event)

            }
            await deleteSession(id)
            console.log('Session is null');
            
        }
        //AUTHENTICATED ACCESS
        if (securedRoutes.has(url.pathname.split('/')[1])){
            console.log(url.origin);
            let response = Response.redirect(url.origin, 302)
            console.log(response);
            return response
        }
        return resolve(event)
    }
    catch( e){
        console.log(e.message);
        return resolve(event)
    }
}
