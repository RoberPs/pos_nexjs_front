export default function Loading() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({length: 6}).map((_, i) => (
             <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="mt-4 flex justify-end">
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                </div>
             </div>
          ))}
      </div>
    )
  }
