"use server"

import { ErrorResponseSchema, OrderSchema, SuccessResponseSchema } from "@/src/schemas"
import { revalidateTag } from "next/cache"




//data se indica con type unknown para que no obtenga todas las propiedades del contents
export const submitOrder= async (data:unknown)=>{

    
    //ZOD TE PERMITE FILTRAR LOS DATOS 
    const order = OrderSchema.parse(data)
    


    const apiBase = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
    
    if (!apiBase) {
        return {
            errors: ["API_URL is not configured"]
        }
    }

    try {
        const request = await fetch(`${apiBase}/transactions`,{
            method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
            body:JSON.stringify({...order})
        })

        const json = await request.json()
        
        if(!request.ok){
            const {error} = ErrorResponseSchema.safeParse(json)

            return{
                errors:[error?.message]
            }
        }

        const success = SuccessResponseSchema.parse(json)
        revalidateTag('products-by-category')
        return{
            errors:[],
            success:success.message
        }
    } catch (error) {
        console.error("Error submitting order:", error);
        return {
            errors: ["Error connecting to API"]
        }
    }
}