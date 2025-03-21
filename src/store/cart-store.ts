import {create} from 'zustand'
import { devtools } from 'zustand/middleware';
import { CartContents, CouponSchemaResponse, Product, Coupon } from '../schemas';




//SOLO FUNCIONA EN CLIENT COMPONENTS

interface Store{
    
    contents:CartContents
    total:number
    discount: number
    coupon:Coupon
    

    addProduct:(product:Product) => void
    deleteProduct:(id:Product['id']) => void
    updateQuantity:(id:Product['id'],quantity:number)=> void
    calculateTotal:() => void
    applyCoupon: (coupon:FormDataEntryValue | null) => Promise <void> //Indica que esta función realiza una consulta a la db y es asincrona
    applyDiscount: () => void
    clearCart: () =>void
}


const initialState = {
    total:0,
    contents:[],
    coupon:{
        percentage:0,
        name:'',
        message:''
    },
    discount:0,
}

export const useCartStore = create<Store>()(
    
   
    devtools(

            (set, get) => ({
        
            ...initialState,     
            
            addProduct:(product)=>{

                //Hay que igualar las propiedades de Product y CartContents
                const{id , ...data} = product

                let contents: CartContents = []  
                
                const duplicate = get().contents.findIndex(item=> item.productId === id)
                //Retorna la posición del producto si ya existe en el arreglo del carrito

                if(duplicate >= 0 ){ //Esta duplicado ?? Actualizar cantidad
                     
                     if(get().contents[duplicate].quantity >= get().contents[duplicate].inventory) return
                     //Detener el codigo si se intentan agregar más productos de los que existen en el inventario
                     //del producto que se esta añadiendo  

                     contents = get().contents.map( item=> item.productId === id ? {
                        ...item,
                        quantity: item.quantity + 1 
                     }
                     : item
                    )

                }else{ //Añadir nuevo producto

                    contents = [...get().contents, { //Con get se obtiene los datos directamente del STATE
                        ...data, //Añadir a product la quantity y productId que exige CartContents
                        quantity: 1,
                        productId:id
                    }]
                }

                 //Escribir en el state
                 set(()=> ({
                    contents
                 }))

                 get().calculateTotal()

            },

            updateQuantity:(id,quantity)=>{
     
                 //({id:id,quantity:quantity}) Conectado con el select de la cantidad del carro de compras
                
                 /* const contents = get().contents.map(item=> item.productId === id ? {
                      ...item,
                      quantity: quantity
                      
                 }:item) */

                 
                 set((state)=>({
                    contents: state.contents.map(item => item.productId === id ? {...item, quantity}: item)
                 }))

                 get().calculateTotal()
            },

            deleteProduct:(id)=>{
                  
                set((state)=>({
                    
                    contents: state.contents.filter(item => item.productId !== id)

                    
                }))
                
                //Cuando el carrito este vacio se limpia todo el state completo
                if(!get().contents.length){

                    get().clearCart()
                }

                get().calculateTotal()
                
                
            },

            calculateTotal:()=>{
               
                const total = get().contents.reduce((totalQuantity,item)=> totalQuantity + (item.price* item.quantity),0)
           
                set(()=>({
                    total
                 }))
                 
                 if(get().coupon.percentage >=0){

                    get().applyDiscount()
                 }
            },

            applyCoupon: async (coupon) =>  {
            //Se obtiene el name del cupon desde el form 
            //Envio del cupon desde el store al api/next/route
            //Para retornar la info del nombre del cupon del input de cart
            //Setear el cupon 
            const req = await fetch('/coupons/api',{
                    method:'POST',
                    body:JSON.stringify({
                        name:coupon
                    })
                })
                const json = await req.json() //Hay que retornar la respuesta en el next/api/router  
                  
                const couponResponse = CouponSchemaResponse.parse(json)
               
                set(()=>({
                    coupon:couponResponse
                }))

                if(couponResponse.percentage){
                    get().applyDiscount()
                }
 
            },

            applyDiscount:() =>{
                 
              
              const subtotal = get().contents.reduce((totalQuantity,item)=> totalQuantity + (item.price* item.quantity),0)
              const discount = ((subtotal * get().coupon.percentage) / 100)
              const totalWithDiscount = subtotal - discount
            

              set(()=>({
                 
                 discount,
                 totalWithDiscount

              }))
              
            },

            clearCart:()=>{

               set(()=>({
                  ...initialState
               }))

            }
        })
            

    )
)