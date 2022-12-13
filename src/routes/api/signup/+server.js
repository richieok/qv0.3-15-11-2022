import { json } from "@sveltejs/kit"

export const POST = async ({request})=>{
    const signupData = await request.json()
    console.log(signupData);
    return json({
        status: 'received'
    })
}