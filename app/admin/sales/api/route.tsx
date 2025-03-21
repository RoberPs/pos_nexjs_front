
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request:NextRequest){

    //LEER FECHA DE URL
    const searchParams =(request.nextUrl.searchParams)
    const transactionDate = searchParams.get('transactionDate')
    
    //Petición al backend y obtiene los datos next (en la ruta sales/api)
    const url = `${process.env.API_URL}/transactions?transactionDate=${transactionDate}`
    const req = await fetch(url)
    const json = await req.json()
    return NextResponse.json(json)   
}