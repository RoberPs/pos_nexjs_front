

import { TransactionsResponseSchema } from "./schemas"

//Función reutilizable en pageSales y transitionFilter que obtiene las ventas 

//Se comunica con el next/api/route y se trae todas las consultas
export async function getSalesByDate(date:string){
 
     const url = `${process.env.NEXT_PUBLIC_DOMAIN}/admin/sales/api?transactionDate=${date}`

     const req = await fetch(url)
     const json = await req.json()
     
     const transactions = TransactionsResponseSchema.parse(json)
     
     return transactions
    
}
