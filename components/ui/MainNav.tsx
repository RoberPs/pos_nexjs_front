import Logo from '@/components/ui/Logo'
import { CategoriesSchema } from '@/src/schemas'
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function getCategory(){
       
  const apiBase = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiBase) {
    console.error("Missing API_URL environment variable");
    return []; // Devolver vacío si no hay URL para evitar romper el build
  }

  const request = await fetch(`${apiBase}/categories`)
  const json = await request.json()

  if(!request.ok){
    // Durante el build, el redirect puede fallar si el servidor no responde
    return []; 
  }

  const categories = CategoriesSchema.parse(json)
  return categories
 
}

export default async function MainNav() {
    
    
    const category = await getCategory()
     
   
    return (
      <header className="px-10 py-5 bg-gray-700 flex flex-col md:flex-row justify-between ">
          <div className="flex justify-center">
               <Logo/>
          </div>
  
          <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0">
                {category.map(cat=>(
                  <Link 
                      className='text-white font-bold p-2'
                      href={`/${cat.id}`} 
                      key={cat.id}>
                  {cat.name}
                  </Link>
                ))}   

                <Link 
                   href={'/admin/sales'}
                   className='bg-green-400 text-gray-700 font-bold p-2 rounded-lg'
                >
                Panel de Administración
                </Link>
          </nav>
      </header>
    )
  }