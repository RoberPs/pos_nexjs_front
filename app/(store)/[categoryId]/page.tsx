import { CategoryWithProductsResponseSchema } from "@/src/schemas"
import ProductCard from "@/components/product/ProductCard"
import { redirect } from "next/navigation"


type Params = Promise<{categoryId: string}> //Nueva sintaxis next15


const getCategoryWithProducts = async  (categoryId:string)=>{
     
    const apiBase = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

    if (!apiBase) {
        console.error("Missing API_URL environment variable");
        return { products: [] }; // Fallback para evitar errores en el build
    }

    const url = `${apiBase}/categories/${categoryId}?products=true`

    try {
        const request  = await fetch(url,{
            next:{
              tags:[ 'products-by-category' ]
            }
        })
        
        if(!request.ok){
            redirect('/1')
        }

        const json = await request.json()
        const products = CategoryWithProductsResponseSchema.parse(json)
        return products
    } catch (error) {
        console.error("Error fetching category products:", error);
        return { products: [] };
    }
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