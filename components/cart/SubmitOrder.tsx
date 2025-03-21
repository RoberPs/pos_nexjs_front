import { submitOrder } from '@/actions/submit-order-action'
import { useCartStore } from '@/src/store/cart-store'
import React, { useActionState, useEffect } from 'react'
import { toast } from 'react-toastify';

const SubmitOrder = () => {


 
  const total  = useCartStore(state => state.total)
  const coupon = useCartStore(state => state.coupon.name)
  const contents = useCartStore( state => state.contents)
  const clearCart = useCartStore(state =>state.clearCart)

  const dataOrder = {
     total,
     coupon,
     contents
  }
  
  
  const submitDataOrder = submitOrder.bind(null,dataOrder)
  
  const[state,dispatch]=useActionState(submitDataOrder,{
      errors:[],
      success:''
  })
   
  

  useEffect(()=>{
       if(state.errors){

          (state.errors.forEach(error=>toast.error(error)))
       }
      if(state.success){
           
           toast.success(state.success)
           clearCart()
      }

  },[state])


  return (

    <form action={dispatch}>
        <input 
          type="submit" 
          className='mt-5 w-full bg-indigo-700 text-white uppercase font-bold p-3  hover:cursor-pointer hover:bg-indigo-900'
          value={'Confirmar compra'}
        />
    </form>
  )
}

export default SubmitOrder