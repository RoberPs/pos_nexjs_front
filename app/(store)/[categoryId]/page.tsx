import { CategoryWithProductsResponseSchema, CategoriesSchema } from "@/src/schemas"
import ProductCard from "@/components/product/ProductCard"
import { redirect } from "next/navigation"
import { fetchWithTimeout } from "@/src/api-utils"

type Params = Promise<{categoryId: string}> //Nueva sintaxis next15


const getCategories = async () => {
  const apiBase = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
    
  if (!apiBase) {
      return []; 
  }

  try {
      const request = await fetchWithTimeout(`${apiBase}/categories`, {}, 10000)
      if(!request.ok) return [];
      const json = await request.json()
      const categories = CategoriesSchema.parse(json)
      return categories
  } catch (error) {
      console.error("Error generating static params (categories):", error);
      return [];
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map(category => ({
      categoryId: category.id.toString()
  }))
}


const getCategoryWithProducts = async  (categoryId:string)=>{
     
    const apiBase = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

    if (!apiBase) {
        console.error("Missing API_URL environment variable");
        return { products: [] }; // Fallback para evitar errores en el build
    }

    const url = `${apiBase}/categories/${categoryId}?products=true`

    try {
        const request  = await fetchWithTimeout(url,{
            next:{
              tags:[ 'products-by-category' ]
            }
        }, 15000)
        
        if(!request.ok){
            // Si falla, retornamos array vacío en vez de redirigir, 
            // así el usuario ve al menos la UI (o el mensaje de error si lo implementamos luego)
            console.error(`Failed to fetch products for category ${categoryId}`);
            // throw new Error("Failed to fetch products") // Let error boundary handle it? 
            // Better to return empty for now to match current behavior, but error boundary is better.
            // Converting to throw to trigger Error Boundary as per plan.
            throw new Error(`Error fetching category: ${request.statusText}`);
        }

        const json = await request.json()
        const products = CategoryWithProductsResponseSchema.parse(json)
        return products
    } catch (error) {
        console.error("Error fetching category products:", error);
        throw error; // Propagate to Error Boundary
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