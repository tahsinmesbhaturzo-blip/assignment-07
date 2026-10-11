const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm animate-pulse flex flex-col justify-between">
      {/* কার্ডের উপরের অংশ: আইকন + শিরোনাম */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/3" />
        </div>
      </div>

      {/* কার্ডের নিচের অংশ: দাম + পরিবর্তন */}
      <div className="mt-6 flex justify-between items-end">
        <div className="space-y-1.5">
          <div className="h-3 bg-gray-200 rounded w-16" />
          <div className="h-6 bg-gray-200 rounded w-20" />
        </div>
        <div className="h-6 w-14 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
};

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f3f5f3] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-5">
        
        {/* ১. হেডার ব্যানার স্কেলিটন */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4 animate-pulse">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-6 bg-gray-200 rounded w-32" />
            <div className="h-4 bg-gray-200 rounded w-56" />
          </div>
        </div>

        {/* ২. ফিল্টার ও কাউন্ট বার স্কেলিটন */}
        <div className="flex justify-between items-center px-1 pt-2 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-44" />
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-200 rounded w-10" />
            <div className="h-8 bg-gray-200 rounded-lg w-20" />
          </div>
        </div>

        {/* ৩. প্রোডাক্ট কার্ড গ্রিড স্কেলিটন (৬টি কার্ড ডামি হিসেবে রেন্ডার করা হয়েছে) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>

      </div>
    </div>
  );
}