import { revalidatePath } from "next/cache"

const RemoveSubmitForm = ({productId}:{productId:number}) => {
  
    console.log(productId)

    //CUANDO ES UN SERVER COMPONENT SE PUEDE TENER EL SERVER ACTION INLINE
    //CUANDO ES UN CLIENT COMPONENT SIEMPRE EN UN ARCHIVO A PARTE
    const handleDeleteProduct = async ()=>{
        "use server"
        const apiBase = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
        
        if (!apiBase) {
            console.error("Missing API_URL in handleDeleteProduct");
            return;
        }

        try {
            const req = await fetch(`${apiBase}/products/${productId}`,{
               method:'DELETE',
            })
            await req.json()
            revalidatePath('/admin/products')
        } catch (error) {
            console.error("Error deleting product:", error);
        }
        
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