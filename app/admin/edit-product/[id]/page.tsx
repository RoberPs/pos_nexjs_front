import EditProductForm from '@/components/adminProducts/EditProductForm'
import Heading from '@/components/ui/Heading'
import React from 'react'
import ProductForm from '@/components/adminProducts/ProductForm';
import Link from 'next/link';
import {ProductSchema } from '@/src/schemas';
import { notFound } from 'next/navigation';


//Función que obtiene el producto de la api
const getProduct = async (id:string)=>{

  const req =  await fetch(`${process.env.API_URL}/products/${id}`)
  const json = await req.json()
  
  if(!req.ok){
    notFound()
  }
  const product = ProductSchema.parse(json)
  return product
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