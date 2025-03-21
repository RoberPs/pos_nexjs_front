import { CategoryWithProductsResponseSchema } from "@/src/schemas"
import ProductCard from "@/components/product/ProductCard"
import { redirect } from "next/navigation"


type Params = Promise<{categoryId: string}> //Nueva sintaxis next15


const getCategoryWithProducts = async  (categoryId:string)=>{
     
    const url = `${process.env.API_URL}/categories/${categoryId}?products=true`

    const request  = await fetch(url,{
        next:{
          tags:[ 'products-by-category' ]
        }
    })
    const json = await request.json()
    //safeParse muestra arreglo con errores y success data

    if(!request.ok){
        redirect('/1')
    }

    const products = CategoryWithProductsResponseSchema.parse(json)
   
    return products
}


const storePage = async  ({params}:{params:Params}) => {

    const {categoryId} = await params
    const category = await getCategoryWithProducts(categoryId)


    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
         {category.products.map(product=> (
          <ProductCard key={product.id} product={product}/>
         ))}
      </div>
    )
  }
  
  export default storePage