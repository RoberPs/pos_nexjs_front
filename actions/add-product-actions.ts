"use server"

import { ErrorResponseSchema, ProductFormSchema, SuccessResponseSchema } from "@/src/schemas"


export type PrevState={
    errors:string[],
    success:string
}

export async function addProduct(initialState:PrevState,formdata:FormData){

    const product = ProductFormSchema.safeParse({
        
        name:formdata.get('name'),
        price:formdata.get('price'),
        inventory:formdata.get('inventory'),
        categoryId:formdata.get('categoryId'),
        image:formdata.get('image')
        
    })
    

    if(!product.success){

        const errors= product.error.errors.map(issue=>issue.message)
        return{
            errors:errors,
            success:''
        }
    }
    
    const apiBase = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
    
    if (!apiBase) {
        return {
            errors: ["API_URL is not configured"],
            success: ''
        }
    }

    const url = `${apiBase}/products`
    const request = await fetch(url,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(product.data)
    })

    const json = await request.json()
   
    if(!request.ok){
        
        const error = ErrorResponseSchema.parse(json)
        return{
            errors:[error.error],
            success:''
        }
    } 
    
    
   
    return{
        errors:[],
        success:'Producto creado'
    }
}