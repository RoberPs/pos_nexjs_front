import { revalidatePath } from "next/cache"

const SubmitDeleteForm = ({id}:{id:number}) => {
    
    console.log(id)

    const handleDeleteCupon = async ()=>{
          "use server"
          const req = await fetch(`${process.env.API_URL}/coupons/${id}`,{
             method:'DELETE',
          })
          console.log(req)
          /* await req.json() */
          revalidatePath('/admin/coupons')    
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