import z from 'zod'

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    price: z.coerce.number(),
    inventory: z.number(),
    categoryId: z.number(),

})

export const ProductSchemaWithCategory = ProductSchema.pick({name:true, price:true, inventory:true, categoryId:true}).extend({
    category:z.object({
      id: z.number(),
      name: z.string()
    })
})

export const ProductsSchemaResponse = z.object({
  products:z.array(ProductSchema),
  totalCount: z.number()
})



export const CategorySchema = z.object({
  id: z.number(),
  name: z.string()
})

export const CategoriesSchema = z.array(CategorySchema)

export const CategoryWithProductsResponseSchema = CategorySchema.extend({
    products: z.array(ProductSchema)
});


//SHOPPIN CART

//Objeto de cada producto del carro de compras
export const CartContentsSchema = ProductSchema.pick({name:true, image:true, price:true, inventory:true}).extend({
  productId:z.number(),
  quantity:z.number()
})

//Arreglo con todos los productos
export const CartAllContentsSchema = z.array(CartContentsSchema)



//APPLY COUPONS 

export const CouponSchema = z.object({
      name:z.string().min(1, {message: 'El Nombre del producto no puede ir vacio'}),
      percentage:z.coerce.number({message:'Porcentaje no valido'}),
      expirationDate:z.string().date('Indica una fecha valida')
})

export const CouponSchemaDb = z.object({
    id:z.number(),
    name:z.string(),
    percentage:z.number(),
    expirationDate:z.string().date()
})


export const CouponSchemaResponse = z.object({
  
  name:z.string().default(''),
  message:z.string(),
  percentage:z.coerce.number().min(0).max(100).default(0),
  
})

export const CouponsSchema = z.array(CouponSchemaDb)



//TRANSACTION-ORDERS
const OrderContentSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
  price: z.number()
})
export const OrderSchema = z.object({
  total: z.number(),
  coupon: z.string(),
  contents: z.array(OrderContentSchema).min(1, {message: 'El Carrito no puede ir vacio'})
})


/** Success / Error Response */
export const SuccessResponseSchema = z.object({
  message: z.string()
})
  export const ErrorResponseSchema = z.object({
    message: z.array(z.string()),
    error: z.string(),
    statusCode: z.number()
  })

  export const ContentsSchema = z.object({
    id: z.number(),
    quantity: z.number(),
    price: z.string(),
    product: ProductSchema
  })
  export const TransactionResponseSchema = z.object({
    id: z.number(),
    total: z.string(),
    transactionDate: z.string(),
    discount: z.string().nullable(),
    coupon: z.string().nullable(),
    contents: z.array(ContentsSchema)
  })
  export const TransactionsResponseSchema = z.array(TransactionResponseSchema) 
  
  //NUEVO PRODUCTO ADMIN
  export const ProductFormSchema = z.object({
    name: z.string()
            .min(1, {message: 'El Nombre del Producto no puede ir vacio'}),
    price: z.coerce.number({message: 'Precio no válido'})
            .min(1, {message: 'El Precio debe ser mayor a 0'}),
    inventory: z.coerce.number({message: 'Inventario no válido'})
            .min(1, {message: 'El inventario debe ser mayor a 0'}),
    categoryId: z.coerce.number({message: 'La Categoria no es válida'}),
    image: z.string().min(1,{message:'La imagen no puede ir vacia'})
                
  })
  
  export type Product = z.infer<typeof ProductSchema>
  export type CartContents = z.infer<typeof CartAllContentsSchema>
  export type CartProduct = z.infer<typeof CartContentsSchema>
  export type CouponForm =z.infer<typeof CouponSchema>
  export type Coupon = z.infer<typeof CouponSchemaResponse>
  export type CouponDb = z.infer<typeof CouponSchemaDb>
  export type Transaction = z.infer<typeof TransactionResponseSchema>
  