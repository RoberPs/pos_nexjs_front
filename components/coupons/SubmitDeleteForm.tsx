import { revalidatePath } from "next/cache"

const SubmitDeleteForm = ({id}:{id:number}) => {
    
    console.log(id)

    const handleDeleteCupon = async ()=>{
          "use server"
          const apiBase = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
          
          if (!apiBase) {
              console.error("Missing API_URL in handleDeleteCupon");
              return;
          }

          try {
              const req = await fetch(`${apiBase}/coupons/${id}`,{
                 method:'DELETE',
              })
              console.log(req)
              /* await req.json() */
              revalidatePath('/admin/coupons')    
          } catch (error) {
              console.error("Error deleting coupon:", error);
          }
    }

  return (
    <form action={handleDeleteCupon}>
        <input   
            type="submit" 
            className="bg-red-500 py-1 px-2 rounded text-white font-bold hover:bg-red-700"
            value={'Eliminar'}
        /> 
    </form>
  )
}

export default SubmitDeleteForm