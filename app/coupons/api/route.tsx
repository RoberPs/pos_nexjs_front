//SERVICIO DESDE EL STATE 
//SE EJECUTA EN EL SERVIDOR 

import { fetchWithTimeout } from "@/src/api-utils";

export async function POST(request:Request){
   
   try {
      //Forma de next de recuperar un valor del store (await request.json()) 
      const coupon = await request.json()
      
      const apiBase = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
      
      if (!apiBase) {
          console.error("Missing API_URL in coupons API route");
          return Response.json({ message: "API_URL missing", status: 500 });
      }

      const url = `${apiBase}/coupons/apply_coupon`
      
      // POST requests might take slightly longer, set 15s timeout
      const req = await fetchWithTimeout(url,{
         method:'POST',
         headers:{
            "Content-Type":"application/json"
         },
         body:JSON.stringify(coupon)
      }, 15000)

      if (!req.ok) {
          const errorResponse = await req.json().catch(() => ({ message: "Error in backend" }));
          return Response.json({...errorResponse, status: req.status });
      }

      const response = await req.json()
      return Response.json({...response,status:req.status }) //Retornar la respuesta y error para el front
   } catch (error) {
       console.error("Error in coupons API route:", error);
       return Response.json({ message: "Internal server error", status: 500 });
   }
}