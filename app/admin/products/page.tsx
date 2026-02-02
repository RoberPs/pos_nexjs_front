
import ProductsTable from '@/components/adminProducts/ProductsTable'
import Heading from '@/components/ui/Heading'
import { ProductsSchemaResponse } from '@/src/schemas'
import { isValidPage } from '@/src/utils'
import { redirect } from 'next/navigation'
import Paginator from '@/components/adminProducts/Paginator'
import Link from 'next/link'


const getAllProducts = async (take:number,skip:number)=>{
     
  const apiBase = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiBase) {
      console.error("Missing API_URL in getAllProducts");
      return { products: [], total: 0 };
  }

  try {
      const url = `${apiBase}/products?take=${take}&skip=${skip}`
      const req = await fetch(url)
      
      if (!req.ok) {
          return { products: [], total: 0 };
      }

      const json = await req.json()
      const data = ProductsSchemaResponse.parse(json)

      return{
        products:data.products,
        total:data.totalCount
      } 
  } catch (error) {
      console.error("Error in getAllProducts:", error);
      return { products: [], total: 0 };
  }
}

//CONSTRUIR EL PAGINADOR 

type SearchParams = Promise<{ page: string }>

const ProductsPage = async({searchParams}:{searchParams:SearchParams}) => {
  
  //Obtener el parametro que indicara la pagina en la que estamos
  const {page}= await searchParams
  
  if(!isValidPage(+page)) redirect('/admin/products?page=1')
  
  const productsPerPage = 8 // productos por pagina
  const skip = (+page -1) * productsPerPage // salto de cantidad de productos segun la pagina en la que estamos
  const data = await getAllProducts(productsPerPage, skip)  //peticion de productos con variables 
  const{products,total} = data
  const totalPages = Math.ceil(total / productsPerPage) // Calculo total de paginas
  
  // Evitar bucle infinito si la API no devuelve nada
  if(+page > totalPages && totalPages > 0) return redirect('/admin/products?page=1') 
   
 
  return (
    <>
      
      <div className='flex items-center justify-between'> 

       <Heading>Adminstrar Productos</Heading>
        
       <Link
          href={'/admin/new-product'}
          className='bg-[#374151] py-2 px-4 rounded text-white'

       >Añadir Producto &#43;
       
       </Link>
      </div>

       <ProductsTable products={products} />

       <Paginator totalPages={totalPages} page={+page} baseUrl='/admin/products' />
       

    </>
    
  )
}

export default ProductsPage