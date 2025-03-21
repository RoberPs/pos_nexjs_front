import Heading from '@/components/ui/Heading'
import Link from 'next/link'

import React from 'react'

const Notfound = () => {
  return (
    <div className="text-center">
        <Heading>Cupón no encontrado</Heading> 
        <Link
          href={'/admin/cupones'}
          className='font-bold mt-5 block'
          >Volver a <span className='text-green-400'>Cupones</span></Link>
    </div>
  )
}

export default Notfound