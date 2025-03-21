//SERVICIO DESDE EL STATE 
//SE EJECUTA EN EL SERVIDOR 

export async function POST(request:Request){
   
   //Forma de next de recuperar un valor del store (await request.json()) 
   const coupon = await request.json()
   const url = `${process.env.API_URL}/coupons/apply_coupon`
   const req = await fetch(url,{
      method:'POST',
      headers:{
         "Content-Type":"application/json"
      },
      body:JSON.stringify(coupon)
   })
   const response = await req.json()
   

   return Response.json({...response,status:req.status }) //Retornar la respuesta y error para el front
}