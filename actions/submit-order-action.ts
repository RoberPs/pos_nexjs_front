"use server"

import { ErrorResponseSchema, OrderSchema, SuccessResponseSchema } from "@/src/schemas"
import { revalidateTag } from "next/cache"




//data se indica con type unknown para que no obtenga todas las propiedades del contents
export const submitOrder= async (data:unknown)=>{

    
    //ZOD TE PERMITE FILTRAR LOS DATOS 
    const order = OrderSchema.parse(data)
    


    const request = await fetch(`${process.env.API_URL}/transactions`,{
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
}