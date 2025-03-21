import Link from "next/link"



type PaginatorProps={
    totalPages:number,
    page:number,
    baseUrl:string
}

const Paginator = ({totalPages,page,baseUrl}:PaginatorProps) => {
    
 
  return (
    <> 
        <div className="flex items-center mx-auto justify-center mt-10">
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-xs" aria-label="Pagination">
                    {page > 1 && (

                        <Link
                        href={`${baseUrl}?page=${page -1 }`}
                        className="py-1 px-3 border border-gray-400 hover:bg-blue-700 hover:text-white"
                        >
                        &laquo; 
                        </Link>
                        
                    )}

        
                { Array.from({length:totalPages},(value,index)=> index + 1 ).map(currentPage=>(

                    <Link 
                    key={currentPage} 
                    href={`${baseUrl}?page=${currentPage}`} 
                    aria-current="page" 
                    className={`${currentPage === page && 'bg-blue-700 text-white'} py-1 px-3 border border-gray-400 hover:bg-blue-700 hover:text-white` }
                    >
                        {currentPage}
                    </Link>
                ))}

                    {page < totalPages && (

                        <Link
                        href={`/admin/products?page=${page +1 }`}
                        className="py-1 px-3 border border-gray-400 hover:bg-blue-700 hover:text-white"
                        >
                        &raquo; 
                        </Link>

                    )}


                
            </nav>
        </div>
    </>
  )
}

export default Paginator