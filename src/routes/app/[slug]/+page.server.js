import { getDb } from "$lib/server/db.js"

export const load = async ({params, fetch})=>{
    const {slug} = params;
    const result = await fetch(`/api/collection/${slug}`,{
        credentials: 'include'
    })
    const {list, count} = await result.json()
    return {
        documents: list,
        collection: slug,
        count
    }
}
