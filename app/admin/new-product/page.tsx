import {AddProductForm} from '@/components/adminProducts/AddProductForm'
import ProductForm from '@/components/adminProducts/ProductForm'
import Heading from '@/components/ui/Heading'
import Link from 'next/link'


const NewProductPage = () => {
  return (
    <>
       <div className='flex items-center justify-between mb-10'> 

            <Heading>Nuevo Producto</Heading>

            <Link
               href={'/admin/products?page=1'}
               className='bg-[#374151] py-2 px-4 rounded text-white hover:bg-slate-500'

            >Volver a Productos

            </Link>

        </div>

            <AddProductForm>
                <ProductForm/>
            </AddProductForm>
      
    </>
  )
}

export default NewProductPage