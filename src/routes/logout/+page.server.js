import { redirect } from "@sveltejs/kit"
import { deleteSession } from "$lib/server/session.js"

export const load = async ({locals, cookies})=>{
    //Cleanup
    if (locals?.user?.id){
        try{
            const result = await deleteSession(locals?.user?.id)
            console.log(result);
            if (!result){
                throw new Error('Session deletion failed')
            }
            cookies.delete('sessionId')
            return {
                logout: true
            }
        }
        catch(e){
            console.log(e.message);
            return {
                logout: false
            }
        }
    }
    throw redirect(300, '/')
}