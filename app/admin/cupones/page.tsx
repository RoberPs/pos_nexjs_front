import Heading from "@/components/ui/Heading"
import Link from "next/link"
import CouponTable from "@/components/coupons/CouponTable"
import { CouponsSchema } from "@/src/schemas"

const NewCoupons = async() => {


    const url = `${process.env.API_URL}/coupons`

    const req = await fetch(url)
    const json = await req.json()
    
    

    const data = CouponsSchema.parse(json)
    console.log(data)
   
    return (
      <>
         <div className='flex items-center justify-between mb-10'> 
  
              <Heading>Cupones de descuento</Heading>
               <Link 
                  href={'new-coupon'}
                   className='bg-[#374151] py-2 px-4 rounded text-white'
                >
                  Añadir Cupon
               </Link>

          </div>
               
           <CouponTable data={data}/>
      </>
    )
  }

export default NewCoupons