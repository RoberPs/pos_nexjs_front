"use client"
import { percentages } from "@/src/data/percentage"
import { CouponDb } from "@/src/schemas"
import { useActionState, useEffect } from "react"
import {updateCupon} from '@/actions/edit-coupon-action'
import {toast} from 'react-toastify'
import { redirect } from "next/navigation"


const EditCouponForm = ({cupon}:{cupon:CouponDb}) => {
    
    
     const editCuponWithId = updateCupon.bind(null, cupon.id) 
     const[state , dispatch] = useActionState(editCuponWithId,{
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
            redirect('/admin/cupones') 
        }

     },[state])

     
      return (
           
           <form action={dispatch} className='mt-5'>
                 <div className="space-y-2 ">
                     <label
                         htmlFor="name"
                         className="block"
                     >Nombre Cupón</label>
                     <input
                         id="name"
                         type="text"
                         placeholder="Nombre Producto"
                         className="border border-gray-300 w-full p-2"
                         name="name"
                         defaultValue={cupon.name}
                     />
                     </div>
             
                     <div className="space-y-2 ">
                     <label
                         htmlFor="percentage"
                         className="block"
                     >Descuento</label>
                     <select
                         id="percentage"
                         className="border border-gray-300 w-full p-2 bg-white"
                         name="percentage" 
                         defaultValue={cupon.percentage}
                     >
                         <option value={''}>--Selecciona--</option>
                         {percentages.map(percentage=>(
                             <option key={percentage}>{percentage}</option>
                         ))}
     
                     </select>
                     <label htmlFor="expirationDate">Fecha Expiración</label>
                     <input
                        id="expirationDate" 
                        type="date" 
                        className="border boder-gray-300 w-full p-2 bg-white"  
                        name="expirationDate" 
                        defaultValue={cupon.expirationDate}
                     />
     
                 </div>
                 <input 
                     type="submit" 
                     value={'Guardar Cupón'}
                     className=" bg-green-500 w-full py-2 mt-10 font-bold text-white hover:cursor-pointer hover:bg-green-600"
                 />
             </form>
  )
}

export default EditCouponForm