
import Image from 'next/image';
import {formatCurrency, getImagePath, isAvalaible} from '../../src/utils'
import AddProductButton from './AddProductButton';
import { Product } from '../../src/schemas';



export default function ProductCard({product}:{product:Product}) {
       
       
       return (

            <div
                className='rounded bg-white shadow flex justify-between items-start p-5 relative'
                key={product.id}
                 >    
                <div className={`${!isAvalaible(product.inventory) && 'opacity-50'} `}>
                    <Image 
                      src={getImagePath(product.image)}
                      alt={`${product.name}`}
                      width={500}
                      height={500}
                      priority
                    >

                    </Image>
                    <div className="p-3 space-y-2">
                        <h3 className="text-xl font-bold text-gray-600">{product.name}</h3>

                        {isAvalaible(product.inventory)? (

                            <p className="text-gray-500">Disponibles:{' '}{product.inventory} uds</p>

                        ):(
                          <p className="text-red-500">Producto Agotado</p>
                        )
                        
                        }
                        <p className="text-2xl font-extrabold  text-gray-900">{formatCurrency(product.price)}</p>
                    </div>
                </div>
                 {
                   !isAvalaible(product.inventory) ?
                    ( 
                      <>
                      
                      <span className='hidden'> <AddProductButton product={product}/></span>
                      <div className='absolute w-full py-1 bg-white opacity-60 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                           <p className='text-center font-bold'>AGOTADO</p>
                      </div>
                      </>
                    )
                    :
                    (


                      <AddProductButton product={product}/>
                    )
                 }
            </div>

        
        
       )
}