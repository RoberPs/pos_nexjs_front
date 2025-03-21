"use client"
import React from 'react'
import { useCartStore } from '@/src/store/cart-store'
import ShoppingCartItem from './ShoppingCartItem'
import { CartContents } from '@/src/schemas'
import Amount from './Amount'
import CouponForm from './CouponForm';
import SubmitOrder from './SubmitOrder'


const ShoppingCart = () => {
 
  const contents = useCartStore(state=>state.contents)
  const total = useCartStore(state => state.total)
  const coupon = useCartStore(state => state.coupon)
  const discount = useCartStore(state => state.discount)

  console.log(contents)
  
  return (
    <> 
       {contents.length ? (
        <>
            
            <h1 className='text-4xl font-bold text-gray-600'>Resumen de Venta</h1>
            <ul role='list'>
              {contents.map(item=>(
                  <ShoppingCartItem 
                    key={item.productId}
                    item={item}
                  />
              ))}
              
            </ul>
            
            <dl>
              <Amount label={'Total'} amount={(total)}/>

              {discount ? (
                <>
                 <Amount label={`Descuento ${coupon.name}`} amount={- discount} coupon={true}/>
                 <Amount label={'Total a pagar'} amount={total-discount}/>
                </>
              ):null}

            </dl>

            <CouponForm />
            <SubmitOrder/>

        </>
       ):(<h1 className='text-2xl font-bold text-gray-600'>El carrito esta vacio</h1>)
       }
       
       
    </>
  )
}

export default ShoppingCart 