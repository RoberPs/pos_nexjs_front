
import { Product } from '../../src/schemas';
import Image from 'next/image'
import Link from 'next/link'
import { formatCurrency, getImagePath, isAvalaible } from '../../src/utils';
import RemoveSubmitForm from './RemoveSubmitForm';

export default function ProductsTable({products}:{products:Product[]}) {
   
    return (
      <div className="px-4 sm:px-6 lg:px-8 mt-10">
        <div className="mt-8 flow-root ">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 ">
              <table className="min-w-full divide-y divide-gray-300 ">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Imagen
                    </th>
  
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Producto
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Precio
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Inventario
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    
                    {products.map(item=>(

                      <tr key={item.id}>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            <Image
                               src={getImagePath(item.image)}
                               height={45}
                               width={45}
                               alt={item.name}
                               priority
                             >

                            </Image>
                        </td>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                             {item.name}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                             {formatCurrency(item.price)}
                        </td>
                        {isAvalaible(item.inventory)?(

                        <td className="px-3 py-4 text-sm text-gray-500">
                             {`${item.inventory} uds`}
                        </td>
                        ):(<td className="px-3 py-4 text-sm text-red-500" >Agotado</td>)}

                        <td className="relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 ">
                          <div className='flex gap-5 justify-end items-center'>
                                 <Link
                                    href={`/admin/edit-product/${item.id}`}
                                    className=' text-blue-700 '
                                
                                 >
                                   Editar 
                                 </Link>

                                 <RemoveSubmitForm productId ={item.id} />
                          </div>
                        </td>
                      </tr>
                      ))} 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }