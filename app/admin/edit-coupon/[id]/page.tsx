
import Link from "next/link"
import Heading from "@/components/ui/Heading"
import EditCouponForm from "@/components/coupons/EditCouponForm"

type Params = Promise<{id: string}>

const EditCouponPage = async({params}:{params:Params}) => {
     
    const {id} = await params
    
    const request = await fetch(`${process.env.API_URL}/coupons/${id}`)
    const cupon = await request.json()
    
    
    
    return (
       <>
      
            <div className='flex items-center justify-between mb-5'> 

                <Heading>Editar Cupón </Heading>

                <Link
                    href={'/admin/cupones'}
                    className='bg-[#374151] py-2 px-4 rounded text-white'

                >
                Volver
                </Link>
            </div>

            <EditCouponForm  cupon={cupon}/>
        </> 
   )
}

export default EditCouponPage