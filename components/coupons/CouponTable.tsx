import { CouponDb } from "@/src/schemas"
import Link from "next/link"
import SubmitDeleteAction from "./SubmitDeleteForm" 

export type CouponDbProps ={
    data:CouponDb[]
}

const CouponTable = ({data}:CouponDbProps) => {

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-10">
        <div className="mt-8 flow-root ">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 ">
                    <table className="min-w-full divide-y divide-gray-300 ">
                        <thead>
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                            Cupón
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Descuento
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Fecha de Expiración
                            </th>
    
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">

                           {data.map(item=>(
                              
                              <tr key={item.id}>
                                 <td className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                     {item.name}
                                 </td>
                                 <td className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                     {item.percentage}
                                 </td>
                                 <td className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                     {item.expirationDate}
                                 </td>

                                   <td className="flex items-center gap-3 px-3 py-3.5">
                                           <Link 
                                              href={`/admin/edit-coupon/${item.id}`}
                                              className="bg-blue-500 py-1 px-2 rounded text-white font-bold hover:bg-blue-700"
                                              >
                                                Editar
                                            </Link> 
                                            <SubmitDeleteAction id={item.id}/>
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

export default CouponTable