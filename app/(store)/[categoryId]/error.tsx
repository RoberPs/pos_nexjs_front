'use client' // Error components must be Client Components

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 px-4 text-center">
      <h2 className="text-2xl font-bold text-gray-800">¡Ups! Algo salió mal.</h2>
      <p className="text-gray-600">
        No pudimos cargar los productos de esta categoría.
        {error.message && <span className="block text-sm text-gray-500 mt-2">Detalle: {error.message}</span>}
      </p>
      
      <div className="flex gap-4 mt-6">
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="px-4 py-2 bg-[#374151] text-white rounded hover:bg-gray-800 transition-colors"
        >
          Intentar de nuevo
        </button>
        
        <Link 
            href="/1" 
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
        >
            Volver al inicio
        </Link>
      </div>
    </div>
  )
}
