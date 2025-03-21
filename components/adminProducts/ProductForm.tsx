import { CategoriesSchema, Product} from "@/src/schemas"
import UploadProductImage from './UploadProductImage';

//Este componente es reutilizable para los  form de add y edit ya que cada uno conlleva una acción
export default async function ProductForm({product}:{product?:Product}) {

   //Categorias para el select
   const url = `${process.env.API_URL}/categories`
   const request = await fetch(url)
   const json = await request.json()
   const categories = CategoriesSchema.parse(json)
   
    return (
      <>
        <div className="space-y-2 ">
          <label
            htmlFor="name"
            className="block"
          >Nombre Producto</label>
          <input
            id="name"
            type="text"
            placeholder="Nombre Producto"
            className="border border-gray-300 w-full p-2"
            name="name"
            defaultValue={product?.name}
          />
        </div>
  
        <div className="space-y-2 ">
          <label
            htmlFor="price"
            className="block"
          >Precio</label>
          <input
            id="price"
            type="number"
            placeholder="Precio Producto"
            className="border border-gray-300 w-full p-2"
            name="price"
            min={0}
            defaultValue={product?.price}
          />
        </div>
  
        <div className="space-y-2 ">
          <label
            htmlFor="inventory"
            className="block"
          >Inventario</label>
          <input
            id="inventory"
            type="number"
            placeholder="Cantidad Disponible"
            className="border border-gray-300 w-full p-2"
            name="inventory"
            min={0}
            defaultValue={product?.inventory}
          />
        </div>
  
        <div className="space-y-2 ">
          <label
            htmlFor="categoryId"
            className="block"
          >Categoría</label>
          <select
            id="categoryId"
            className="border border-gray-300 w-full p-2 bg-white"
            name="categoryId" 
            defaultValue={product?.categoryId}
          >
            <option  value={''}>Selecciona categoria</option>
            {categories.map(category=>(
                 <option  key={category.id} value={category.id}>{category.name}</option>
            ))}
  
          </select>
        </div>

        <UploadProductImage currentImage={product?.image}/>
  
      </>
    )
  }