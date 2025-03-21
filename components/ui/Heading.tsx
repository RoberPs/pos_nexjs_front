import React, { ReactNode } from 'react'

const Heading = ({children}:{children:ReactNode}) => {
  return (
    <div className='text-4xl text-gray-700 font-bold'>{children}</div>
  )
}

export default Heading