import EditProductForm from '@/components/adminProducts/EditProductForm'
import Heading from '@/components/ui/Heading'
import React from 'react'
import ProductForm from '@/components/adminProducts/ProductForm';
import Link from 'next/link';
import {ProductSchema } from '@/src/schemas';
import { notFound } from 'next/navigation';


//Función que obtiene el producto de la api
const getProduct = async (id:string)=>{

  const apiBase = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiBase) {
      console.error("Missing API_URL in getProduct");
      notFound();
  }

  try {
      const req =  await fetch(`${apiBase}/products/${id}`)
      
      if(!req.ok){
        notFound()
      }

      const json = await req.json()
      const product = ProductSchema.parse(json)
      return product
  } catch (error) {
      console.error("Error fetching product:", error);
      notFound();
  }
}


type Params = Promise<{id: string}>

const EditProductPage = async ({params}:{params:Params}) => {

  const {id} = await params
  const product = await getProduct(id)
               
  return (                                   
    <>
      <div className='flex items-center justify-between mb-5'> 

          <Heading>Editar Producto :{product.name} </Heading>

          <Link
            href={'/admin/products/?page=1'}
            className='bg-[#374151] py-2 px-4 rounded text-white'

          >Volver

          </Link>
      </div>

      <EditProductForm>
          <ProductForm product={product}/>
      </EditProductForm>
    </>
  )
}

export default EditProductPage