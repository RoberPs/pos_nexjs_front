

import { TransactionsResponseSchema } from "./schemas"

//Función reutilizable en pageSales y transitionFilter que obtiene las ventas 

//Se comunica con el next/api/route y se trae todas las consultas
export async function getSalesByDate(date:string){
  
    const domain = process.env.NEXT_PUBLIC_DOMAIN || '';
    
    // Si estamos en el servidor durante el build y no hay dominio, 
    // intentamos usar API_URL directamente para evitar el proxy si es posible,
    // o simplemente devolvemos vacío para no romper la compilación.
    if (typeof window === 'undefined' && !domain && !process.env.API_URL) {
        console.warn("No domain or API_URL found for getSalesByDate during build");
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
