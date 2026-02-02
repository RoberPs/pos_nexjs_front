

import { TransactionsResponseSchema } from "./schemas"

//Función reutilizable en pageSales y transitionFilter que obtiene las ventas 

//Se comunica con el next/api/route y se trae todas las consultas
export async function getSalesByDate(date:string){
  
    const domain = process.env.NEXT_PUBLIC_DOMAIN || '';
    
    // Durante el build o en el servidor, fetch() requiere una URL absoluta.
    // Si no hay dominio, devolvemos vacío para no romper la compilación.
    if (typeof window === 'undefined' && !domain) {
        console.warn("No domain found for getSalesByDate during build/SSR. Skipping fetch.");
        return [];
    }

    const url = domain 
        ? `${domain}/admin/sales/api?transactionDate=${date}`
        : `/admin/sales/api?transactionDate=${date}`;

    try {
        const req = await fetch(url)
        if (!req.ok) return [];
        
        const json = await req.json()
        const transactions = TransactionsResponseSchema.parse(json)
        return transactions
    } catch (error) {
        console.error("Error in getSalesByDate:", error);
        return [];
    }
}
