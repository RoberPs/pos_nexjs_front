"use client"

import { uploadImage } from '@/actions/upload-image-actions'
import Image from 'next/image'
import { useCallback, useState } from 'react' // 
import { getImagePath } from '../../src/utils';
import{ useDropzone} from 'react-dropzone'




const UploadProductImage = ({currentImage}:{currentImage?:string}) => {

    (currentImage)
    const [image, setImage] = useState('')

    const{getRootProps, getInputProps,isDragActive,isDragReject, isDragAccept} = useDropzone({
        accept:{
            'image/jpeg':['.jpg'],
            'image/png' :['.png'],
            'image/svg' :['.svg']
        },
        onDrop: useCallback(async (files:File[])=>{  //Almacena los valores en cache para limitar el renderizado
            
            const formData = new FormData()

            files.forEach(file=>{
                
                formData.append('file',file)
            })
            const image = await uploadImage(formData)
            (image) //URL COMPLETA  DE CLOUDINARY 
            setImage(image)
            
        },[]),
        maxFiles:1
    })

     
    return (

        <>
            <div className="space-y-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                Imagen Producto
                </label>
                <div {...getRootProps({
                className: `
                        py-10 border-2 border-dashed  text-center 
                        ${isDragActive ? 'border-gray-900 text-gray-900 bg-gray-200 ' : 'border-gray-400 text-gray-400 bg-white'} 
                        ${isDragReject ? 'border-none bg-white' : 'cursor-not-allowed'}
                    `})}>
                <input {...getInputProps()} />
                {isDragAccept && (<p>Suelta la Imagen</p>)}
                {isDragReject && (<p>Archivo no válido</p>)}
                {!isDragActive && (<p>Arrastra y suelta una imagen aquí</p>)}
                </div>
            </div>
            

             {image && (
                   <div>
                        <p>Imagen Producto: </p>
                        <div className='w-[300px] h-[420px] relative'>
                           <Image
                              src={image}
                              alt='Imagen publicada'
                              className='object-cover'
                              fill
                            >

                           </Image>

                        </div>

                   </div>
             )
             }

             {/* En un client-component se accede a las variables de entorno con NEXT_PUBLIC */}
             {currentImage && !image && (
                   <div>
                        <p>Imagen Actual: </p>
                        <div className='w-[300px] h-[420px] relative'>
                           <Image
                              src={getImagePath(currentImage)}
                              alt='Imagen publicada'
                              className='object-cover'
                              fill
                            >

                           </Image>

                        </div>

                   </div>
             )
             }

            {
            /* Campo oculto para enviar la url de la imagen a db desde action addProduct */
            /* En el defaultValue hay que especificar el tipo de imagen que se envia:
               La imagen actual o la nueva ya que se pueden realizar cambios en los demas campos
               y tiene que reconocerlo
            */
            }
            <input
              type='hidden'
              name='image'
              defaultValue={image ? image : currentImage} 
             >
             
            </input>
        </>
  )
}

export default UploadProductImage