"use client"
import { useState } from 'react';
import { formatISO,format } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useQuery } from '@tanstack/react-query';
import { getSalesByDate } from '@/src/api';
import TransactionsSummary from './TransactionsSummary';
import { formatCurrency } from '../../src/utils';

//types react/calendar
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const TransactionsFilter =() => {

  const[date, setData] = useState<Value>(new Date())
  const fecha = format(date?.toString() || new Date(),'yyyy-MM-dd')
 
  
  //Retorno de respuesta
  const{data, isLoading} = useQuery({
     queryKey:['sales',fecha],  //Si se repite la  misma fecha en la consulta no la realiza de nuevo
     queryFn:()=> getSalesByDate(fecha),
     
     
  })
  
  const totalSalesByDay = data?.reduce((totalv,sale)=> totalv + (+sale.total ),0)
  
 return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 '>
        <div >
            <Calendar 
               value={date}
               onChange={setData}
               className='sticky top-10'
               locale='es'
               
            />
        </div>
       
        <div>
            {isLoading && 'Cargando...'}
            {data ? 
               data.length ? data.map(transaction=>(<TransactionsSummary key={transaction.id} transaction={transaction}/>))
               :
               (<p>No hay Ventas en la fecha seleccionada</p>)
            :null}
            
             <div className="flex justify-between mt-5">
                <dt className="text-lg text-black font-bold">Total ventas del dia:</dt>
                <dd className="text-lg text-red-500 font-black">{formatCurrency(+totalSalesByDay!)}</dd>
            </div>
           
        </div>
    </div>
  )
}

export default TransactionsFilter