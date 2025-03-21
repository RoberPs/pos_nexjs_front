"use server"
import { CouponSchema, ErrorResponseSchema, SuccessResponseSchema } from "@/src/schemas"

type PrevState ={
    errors:string[],
    success:string
}


export const updateCupon =async(id:number, initialState:PrevState ,formData:FormData)=>{
    
   
   const upCupon  = CouponSchema.safeParse({
         
       name:formData.get('name'),
       percentage:formData.get('percentage'),
       expirationDate:formData.get('expirationDate')


   })

   console.log(upCupon)
  
   if(!upCupon.success){
      return{
        errors: upCupon.error.errors.map(issue=>issue.message),
        success:''
      }
   }
    
  
   const req = await fetch(`${process.env.API_URL}/coupons/${id}`,{
      method:'PATCH',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(upCupon.data)
   })

   const json = await req.json()
   console.log(json)

   if(!req.ok){
       
       const error = ErrorResponseSchema.parse(json)

       return{
          errors:[error.error],
          success:''
       }

   }

   const success = SuccessResponseSchema.parse(json)

   return{
      errors:[],
      success:success.message
   }
   
}