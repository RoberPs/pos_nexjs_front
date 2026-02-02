
import Link from "next/link"
import Heading from "@/components/ui/Heading"
import EditCouponForm from "@/components/coupons/EditCouponForm"
import { notFound } from "next/navigation"

type Params = Promise<{id: string}>

const EditCouponPage = async({params}:{params:Params}) => {
     
    const {id} = await params
    const apiBase = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
    
    if (!apiBase) {
        console.error("Missing API_URL in EditCouponPage");
        return notFound();
    }

    try {
        const request = await fetch(`${apiBase}/coupons/${id}`)
        if (!request.ok) {
            return notFound();
        }
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
    } catch (error) {
        console.error("Error fetching coupon:", error);
        return notFound();
    }
}

export default EditCouponPage