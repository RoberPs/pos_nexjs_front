"use server"


export const uploadImage = async(formdata:FormData):Promise<string> =>{
     
   const apiBase = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
   
   if (!apiBase) {
       console.error("Missing API_URL in uploadImage");
       return "";
   }

   try {
      const request = await fetch( `${apiBase}/products/upload-image`,{
          method:'POST',
          body:formdata
      })

      if (!request.ok) return "";

      const image = await request.json()
      return image.secure_url // muestra la imagen desde cloudinary
   } catch (error) {
       console.error("Error in uploadImage:", error);
       return "";
   }
}