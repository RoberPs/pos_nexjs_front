import Heading from '@/components/ui/Heading'
import Link from 'next/link'

import React from 'react'

const Notfound = () => {
  return (
    <div className="text-center">
        <Heading>Producto no encontrado</Heading> 
        <Link
          href={'/admin/products'}
          className='font-bold mt-5 block'
          >Volver a <span className='text-green-400'>productos</span></Link>
    </div>
  )
}

export default Notfound