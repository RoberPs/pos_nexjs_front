"use server"
import { Coupon, CouponSchema, ErrorResponseSchema } from "@/src/schemas"
import { SuccessResponseSchema } from '../src/schemas';


export type PrevState ={
    
    errors:string[],
    success:string
}


export const addCoupon = async (initialState:PrevState, formData:FormData)=>{

    const coupon = CouponSchema.safeParse({
        name:formData.get('name'),
        percentage:formData.get('percentage'),
        expirationDate:formData.get('expirationDate')  
    })  
    
    if(!coupon.success){
        
        return{
            errors: coupon.error.errors.map(issue=>issue.message),
            success:''
        }
    }
    
      
    const url = `${process.env.API_URL}/coupons`

    const request = await fetch(url,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(coupon.data)
    })
    
    const json = await request.json()
   
     if(!request.ok){

        const error = ErrorResponseSchema.parse(json)
        
        return{
            errors:[error.error],
            success:''
        }
     }

     const{message} = SuccessResponseSchema.parse(json)
     
     return {
        errors:[],
        success:message 
     }

}