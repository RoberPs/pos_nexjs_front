import Heading from "@/components/ui/Heading"
import Link from "next/link"
import CouponTable from "@/components/coupons/CouponTable"
import { CouponsSchema } from "@/src/schemas"
import { fetchWithTimeout } from "@/src/api-utils"

const NewCoupons = async() => {

    const apiBase = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
    
    let data = [];
    if (apiBase) {
        try {
            const url = `${apiBase}/coupons`
            const req = await fetchWithTimeout(url, {}, 10000)
            
            if (req.ok) {
                const json = await req.json()
                data = CouponsSchema.parse(json)
            }
        } catch (error) {
            console.error("Error fetching coupons:", error);
        }
    } else {
        console.error("Missing API_URL in CuponesPage");
    }
    
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