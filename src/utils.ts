

export const formatCurrency = (quantity:number )=> {
     
    return Intl.NumberFormat('es-Es', {
        style: 'currency',
        currency: 'EUR',
    }).format(quantity)
    
}

export const getImagePath=(image:string)=>{

    const cloudinaryBasUrl = 'https://res.cloudinary.com'

    if(image.startsWith(cloudinaryBasUrl)){
       
        return image
    }else{
       

       if(process.env.API_URL === undefined){
           return `${process.env.NEXT_PUBLIC_API_URL}/img/${image}`
       }else{

        return `${process.env.API_URL}/img/${image}`
       } 
    }

}

//FUNCIÓN PARA EL PAGINADOR
export function isValidPage(value: number) {
    if (value == null) { //revisa que existe 
      return false;
    }
    
    if (typeof value !== 'number' && isNaN(value)) { //revisa que se un numero
      return false; 
    }
    if (value <= 0) {
      return false; //revisa que sea mayor a 0
    }
  
    if (!Number.isInteger(value)) { //revisa que sea un número entero
      return false;
    }

    return true;
}

export const isAvalaible = (inventory:number) => inventory > 0