export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f4f6f4] text-gray-800 py-6 px-4 md:px-8 animate-pulse">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-3 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-3 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
        </div>

        {/* Main Product Card Skeleton */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start md:items-center gap-5 w-full">
            {/* Image Box Skeleton */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-2xl shrink-0"></div>

            {/* Product Title & Info Skeleton */}
            <div className="space-y-3 w-full">
              <div className="h-8 w-36 md:w-48 bg-gray-200 rounded-lg"></div>
              <div className="h-4 w-28 bg-gray-200 rounded-md"></div>
              <div className="h-4 w-52 md:w-64 bg-gray-200 rounded-md"></div>
            </div>
          </div>

          {/* Today's Price Box Skeleton */}
          <div className="bg-gray-100/80 border border-gray-100 rounded-2xl p-4 md:p-5 text-center min-w-[150px] space-y-2.5 self-start md:self-auto shrink-0 w-full md:w-auto">
            <div className="h-3 w-16 bg-gray-200 rounded-md mx-auto"></div>
            <div className="h-9 w-20 bg-gray-200 rounded-lg mx-auto"></div>
            <div className="h-3 w-20 bg-gray-200 rounded-md mx-auto"></div>
            <div className="h-5 w-16 bg-gray-200 rounded-md mx-auto mt-1"></div>
          </div>
        </div>

        {/* Price Summary Section Skeleton */}
        <section className="space-y-3">
          <div className="h-6 w-40 bg-gray-200 rounded-md"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3"
              >
                <div className="h-3 w-20 bg-gray-200 rounded-md"></div>
                <div className="h-8 w-28 bg-gray-200 rounded-lg"></div>
                <div className="h-3 w-36 bg-gray-200 rounded-md"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Market-wise Price Table Skeleton */}
        <section className="space-y-3">
          <div className="h-6 w-48 bg-gray-200 rounded-md"></div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-4 md:p-6">
            {/* Table Header Skeleton */}
            <div className="grid grid-cols-5 gap-4 pb-4 border-b border-gray-100">
              <div className="h-4 bg-gray-200 rounded-md col-span-1"></div>
              <div className="h-4 bg-gray-200 rounded-md col-span-1"></div>
              <div className="h-4 bg-gray-200 rounded-md col-span-1"></div>
              <div className="h-4 bg-gray-200 rounded-md col-span-1"></div>
              <div className="h-4 bg-gray-200 rounded-md col-span-1"></div>
            </div>
            
            {/* Table Rows Skeleton */}
            <div className="divide-y divide-gray-50">
              {[1, 2, 3, 4, 5].map((row) => (
                <div key={row} className="grid grid-cols-5 gap-4 py-4 items-center">
                  <div className="h-4 w-3/4 bg-gray-200 rounded-md"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded-md"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded-md mx-auto"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded-md mx-auto"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded-md ml-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Category Button Skeleton */}
        <div className="pt-2">
          <div className="h-10 w-32 bg-gray-200 rounded-xl"></div>
        </div>

      </div>
    </div>
  );
}