"use server"


export const uploadImage = async(formdata:FormData):Promise<string> =>{
    
   const request = await fetch( `${process.env.API_URL}/products/upload-image`,{
       method:'POST',
       body:formdata
   })

   const image = await request.json()
   return image.secure_url // muestra la imagen desde cloudinary
   

}