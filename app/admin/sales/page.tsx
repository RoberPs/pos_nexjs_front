
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
//dehydrate crea un cache previo e hidrata al cliente cuando se obtienen los datos (despues se elimina)
//Con HydrationBoundary se obtienen los datos
import { format } from 'date-fns';
import Heading from '../../../components/ui/Heading';
import TransactionsFilter from '../../../components/transactions/Transactions';
import { getSalesByDate } from '@/src/api';




const SalesPage = async() => {

  //PARA CONSULTAR LAS VENTAS DE LA FECHA ACTUAL
  const queryClient = new QueryClient()
  const today = new Date()
  const formateDate = format(today,'yyyy-MM-dd')
  

  //Consulta datos
  await queryClient.prefetchQuery({
      queryKey:['sales',formateDate],  //Si se repite la  misma fecha en la consulta no la realiza de nuevo
      queryFn:()=> getSalesByDate(formateDate),
  })
  

  return (
    <>
      <Heading>Ventas</Heading>
      <p className='text-lg text-gray-700 mt-2'>Aqui apareceran las ventas , utiliza el calendario para filtrar las ventas.</p>
      <HydrationBoundary state={dehydrate(queryClient)}> 
         <TransactionsFilter />
      </HydrationBoundary>
    
    
    </>
  )
}

export default SalesPage