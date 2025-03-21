import { revalidatePath } from "next/cache"

const RemoveSubmitForm = ({productId}:{productId:number}) => {
  
    console.log(productId)

    //CUANDO ES UN SERVER COMPONENT SE PUEDE TENER EL SERVER ACTION INLINE
    //CUANDO ES UN CLIENT COMPONENT SIEMPRE EN UN ARCHIVO A PARTE
    const handleDeleteProduct = async ()=>{
        "use server"
        const req = await fetch(`${process.env.API_URL}/products/${productId}`,{
           method:'DELETE',
        })
        await req.json()
        revalidatePath('/admin/products')
        
    }


   return (
        <form action={handleDeleteProduct}>
            <input 
            type="submit" 
            value={'Eliminar'}
            className=' text-red-700  hover:cursor-pointer'
          
            />
    </form>
  )
}

export default RemoveSubmitForm