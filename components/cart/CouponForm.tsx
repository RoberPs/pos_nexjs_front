
import { useCartStore } from "@/src/store/cart-store"

export default function CouponForm() {
    
    const applyCoupon = useCartStore(state => state.applyCoupon)
    const couponStore = useCartStore(state => state.coupon)
   

    const handleSubmit = async (e:React. FormEvent<HTMLFormElement>)=>{
         
        e.preventDefault()

        const formData = new FormData(e.currentTarget) // detecta formulario actual
        const coupon = (formData.get('coupon_name')) // obtien el valor

        if(!coupon) return 

      
        await applyCoupon(coupon) // Se aplica el cupon despues de comprobar que existe
        
    }

    return (
      <>
      <p className="py-5 font-bold border-t border-gray-300">Canjear Cupón</p>
            <form 
              className="flex gap-2" 
              onSubmit={handleSubmit}
            
            >
              <input 
                  type="text"
                  className="p-2 bg-gray-200 border-gray-300 w-full"
                  placeholder="Ingresa un cupón"
                  name="coupon_name"
                  
              />
              <input 
                  type="submit"
                  className="p-3 bg-green-400 font-bold hover:cursor-pointer"
                  value='Canjear'
              />
            </form>
              
              {couponStore.message ? (<p className="text-center font-black mt-5">{couponStore.message}</p>):null}
           
      </>
    )
  }