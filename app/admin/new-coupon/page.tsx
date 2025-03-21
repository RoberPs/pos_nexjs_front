import Heading from "@/components/ui/Heading"
import AddCouponForm from "@/components/coupons/AddCouponForm"
import Link from "next/link"


const AddCoupon = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading>Nuevo Cupón</Heading>
        <Link 
          href={'/admin/cupones'}
          className="bg-[#374151] py-2 px-4 rounded text-white"  
        >Volver a Cupones</Link>
      </div>
      <AddCouponForm />
    </>

  )
}

export default AddCoupon