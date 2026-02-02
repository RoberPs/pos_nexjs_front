import { NextRequest, NextResponse } from 'next/server';
import { fetchWithTimeout } from '@/src/api-utils';

export async function GET(request:NextRequest){

    //LEER FECHA DE URL
    const searchParams =(request.nextUrl.searchParams)
    const transactionDate = searchParams.get('transactionDate')
    
    const apiBase = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
    
    if (!apiBase) {
        console.error("Missing API_URL in sales API route");
        return NextResponse.json([]);
    }

    try {
        //Petición al backend y obtiene los datos next (en la ruta sales/api)
        const url = `${apiBase}/transactions?transactionDate=${transactionDate}`
        const req = await fetchWithTimeout(url, {}, 10000)
        
        if (!req.ok) {
            return NextResponse.json([]);
        }

        const json = await req.json()
        return NextResponse.json(json)   
    } catch (error) {
        console.error("Error in sales API route:", error);
        return NextResponse.json([]);
    }
}