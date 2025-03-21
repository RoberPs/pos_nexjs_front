"use client"
import { addProduct } from "@/actions/add-product-actions"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"


 export const AddProductForm = ({children}:{children:React.ReactNode}) => {

  const router = useRouter()

  const[state, dispatch] = useActionState(addProduct,{
      errors:[],
      success:''
  })
   
  useEffect(()=>{
      
      if(state.errors){
         
        state.errors.forEach(error=>{
           toast.error(error)
        })
          
      }

      if(state.success){
        
        toast.success(state.success)
        router.push('/admin/products')

      }

  },[state])
   

  return (
    <form 
       action={dispatch}
       className="space-y-4">
        
        {/*  <ProductForm/> Es un servercomponent y no se puede renderizar en un client-component, solo mediante children*/} 
        {children}

        <input 
          type="submit" 
          value={'Crear Producto'}
          className=" bg-green-500 w-full py-2 mt-10 font-bold text-white hover:cursor-pointer hover:bg-green-600"
        />

    </form>
  )
} 

