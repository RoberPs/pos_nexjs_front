"use client"
import { percentages } from "@/src/data/percentage"
import { useActionState, useEffect } from "react"
import { addCoupon } from "@/actions/add-coupon-action"
import {toast} from 'react-toastify'

const AddCouponForm = () => {

  const[state, dispatch] = useActionState(addCoupon,{
     
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
                >
                    <option value="selecciona">--Selecciona--</option>
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
                />

            </div>
            <input 
                type="submit" 
                value={'Crear Cupón'}
                className=" bg-green-500 w-full py-2 mt-10 font-bold text-white hover:cursor-pointer hover:bg-green-600"
            />
        </form>
  )
}

export default AddCouponForm