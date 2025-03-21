"use server"

import { ErrorResponseSchema, ProductFormSchema, SuccessResponseSchema } from "@/src/schemas"


export type PrevState={
    errors:string[],
    success:string,
   
}

export async function editProduct(id:number,initialState:PrevState,formdata:FormData){

    //Validar campos formulario
    const product = ProductFormSchema.safeParse({
        
        name:formdata.get('name'),
        price:formdata.get('price'),
        image:formdata.get('image'),
        inventory:formdata.get('inventory'),
        categoryId:formdata.get('categoryId')
        
    })
    
    //Errores de campos de formulario
    if(!product.success){
        
        return{
            errors: product.error.issues.map(error=>error.message),
            success:''
        }
    }

    //Actualizar en backend db
     
    const req = await fetch(`http://localhost:3000/products/${id}`,{
         method:'PATCH',
         headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(product.data)
    })

    const json = await req.json()
    

    if(!req.ok){
        const errors = ErrorResponseSchema.parse(json)

        return{
            errors:errors.message.map(issue=>issue),
            success:''
        }
    }
   
   
    const success = SuccessResponseSchema.parse(json)
    
    return{
        errors:[],
        success:success.message
    }
}