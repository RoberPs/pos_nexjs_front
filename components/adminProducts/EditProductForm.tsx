"use client"

import { useActionState, useEffect } from "react"
import { editProduct } from "@/actions/edit-product-action"
import { redirect, useParams } from "next/navigation"
import { toast } from "react-toastify"


const EditProductForm = ({children}:{children:React.ReactNode}) => {

  const {id} =  useParams()


  const editProductWithId = editProduct.bind(null,+id!)
  const[state, dispatch] = useActionState(editProductWithId,{
      errors:[],
      success:''
  })

  useEffect(()=>{
      
      if(state.errors){
          
         state.errors.map(error=>{
             toast.error(error)
         })
      }

      if(state.success){
          toast.success(state.success)
          redirect('/admin/products?page=1')
      }
   

  },[state])


  return (
    <form 
        action={dispatch}
        className="space-y-4">
        {children}

        <input 
          type="submit" 
          value={'Guardar Producto'}
          className=" bg-green-500 w-full py-2 mt-10 font-bold text-white hover:cursor-pointer hover:bg-green-600"
        />
    </form>
  )
}

export default EditProductForm