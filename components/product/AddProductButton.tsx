"use client"

import { useCartStore } from "@/src/store/cart-store"
import { Product } from '../../src/schemas';


const AddProductButton = ({product}:{product:Product}) => {
   
   const addProduct = useCartStore(state => state.addProduct)
  
   return (
     <button
      type="button"
      onClick={()=>{addProduct(product)}} 
      
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 bg-indigo-600 rounded-full text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </button>
  )
}

export default AddProductButton