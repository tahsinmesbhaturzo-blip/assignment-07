export const instant = false;
import { ProductItem } from "@/types/ProductType";
import Link from "next/link";

type Props = {
  params: Promise<{ productId: string }>;
};

// Helper function to convert English digits to Bangla digits
const toBn = (num: number | string | undefined | null): string => {
  if (num === undefined || num === null) return "";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (digit) => bnDigits[parseInt(digit, 10)]);
};

const ProductDetailsPage = async ({ params }: Props) => {
  const { productId } = await params;

  const response = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${productId}`,
    { cache: "no-store" }
  );

 

  const product: ProductItem = await response.json();

  // Calculate min, max, and average prices from markets array
  const hasMarkets = product.markets && product.markets.length > 0;
  const minPrice = hasMarkets
    ? Math.min(...product.markets.map((m) => m.min))
    : product.today;
  const maxPrice = hasMarkets
    ? Math.max(...product.markets.map((m) => m.max))
    : product.today;
  const avgPrice = hasMarkets
    ? Math.round(
        product.markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) /
          product.markets.length
      )
    : product.today;

  return (
    <div className="min-h-screen bg-[#f4f6f4] text-gray-800 py-6 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:underline">
            হোম
          </Link>
          <span>&gt;</span>
          <Link href={`/categories/${product.category}`} className="hover:underline">
            {product.categoryNameBn}
          </Link>
          <span>&gt;</span>
          <span className="text-gray-900 font-medium">{product.nameBn}</span>
        </nav>

        {/* Main Product Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start md:items-center gap-5">
            {/* Product Image Container */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-[#f8fafd] rounded-2xl flex items-center justify-center shrink-0 p-3 border border-gray-100">
              <span className="text-4xl">{product.image}</span>
            </div>

            {/* Product Header Information */}
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="text-sm md:text-base text-gray-500 font-medium">
                প্রতি {product.unit} · {product.categoryNameBn}
              </p>
              <p className="text-xs md:text-sm text-gray-500 pt-1">
                {product.change?.dir === "up" && (
                  <>গতকালকের তুলনায় আজ দাম বেড়েছে {toBn(product.change.pct)}%</>
                )}
                {product.change?.dir === "down" && (
                  <>গতকালকের তুলনায় আজ দাম কমেছে {toBn(product.change.pct)}%</>
                )}
                {product.change?.dir === "flat" && (
                  <>গতকালকের তুলনায় আজ দাম অপরিবর্তিত রয়েছে</>
                )}
              </p>
            </div>
          </div>

          {/* Today's Price Right Box */}
          <div className="bg-[#f8faf8] border border-gray-100 rounded-2xl p-4 md:p-5 text-center min-w-[150px] self-start md:self-auto">
            <span className="text-xs font-medium text-gray-500">আজকের দাম</span>
            <div className="text-3xl md:text-4xl font-black text-gray-900 mt-1">
              {toBn(product.today)}
            </div>
            <div className="text-xs text-gray-500 mt-0.5 font-medium">
              টাকা / {product.unit}
            </div>
            <div
              className={`inline-flex items-center justify-center gap-1 text-xs font-bold mt-2 px-2.5 py-0.5 rounded-md ${
                product.change?.dir === "up"
                  ? "text-red-500 bg-red-50"
                  : product.change?.dir === "down"
                  ? "text-emerald-600 bg-emerald-50"
                  : "text-gray-600 bg-gray-100"
              }`}
            >
              {product.change?.dir === "up" && `▲ ${toBn(product.change.pct)}%`}
              {product.change?.dir === "down" && `▼ ${toBn(product.change.pct)}%`}
              {product.change?.dir === "flat" && `— ০%`}
            </div>
          </div>
        </div>

        {/* Price Summary Section */}
        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Min Price Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-1">
              <span className="text-xs text-gray-500 font-medium block">
                সর্বনিম্ন দাম
              </span>
              <div className="text-2xl font-black text-emerald-600">
                {toBn(minPrice)} টাকা
              </div>
              <span className="text-xs text-gray-400 block pt-1">
                সবচেয়ে কম দামের বাজার
              </span>
            </div>

            {/* Max Price Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-1">
              <span className="text-xs text-gray-500 font-medium block">
                সর্বাধিক দাম
              </span>
              <div className="text-2xl font-black text-rose-500">
                {toBn(maxPrice)} টাকা
              </div>
              <span className="text-xs text-gray-400 block pt-1">
                সবচেয়ে বেশি দামের বাজার
              </span>
            </div>

            {/* Avg Price Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-1">
              <span className="text-xs text-gray-500 font-medium block">
                গড় দাম
              </span>
              <div className="text-2xl font-black text-emerald-600">
                {toBn(avgPrice)} টাকা
              </div>
              <span className="text-xs text-gray-400 block pt-1">
                প্রতি {product.unit}-এর হিসাবে
              </span>
            </div>
          </div>
        </section>

        {/* Market-wise Price Table */}
        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 font-semibold bg-white">
                  <th className="py-3.5 px-6 font-medium">বাজার</th>
                  <th className="py-3.5 px-6 font-medium">বিভাগ</th>
                  <th className="py-3.5 px-6 font-medium text-center">সর্বনিম্ন</th>
                  <th className="py-3.5 px-6 font-medium text-center">সর্বাধিক</th>
                  <th className="py-3.5 px-6 font-medium text-right">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-700">
                {product.markets && product.markets.length > 0 ? (
                  product.markets.map((item, idx) => {
                    const marketAvg = (item.min + item.max) / 2;
                    return (
                      <tr
                        key={idx}
                        className={
                          idx % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                        }
                      >
                        <td className="py-3.5 px-6 font-medium text-gray-900">
                          {item.market}
                        </td>
                        <td className="py-3.5 px-6 text-gray-600">
                          {item.division}
                        </td>
                        <td className="py-3.5 px-6 text-center">
                          {toBn(item.min)} টাকা
                        </td>
                        <td className="py-3.5 px-6 text-center">
                          {toBn(item.max)} টাকা
                        </td>
                        <td className="py-3.5 px-6 text-right font-bold text-gray-900">
                          {toBn(
                            Number.isInteger(marketAvg)
                              ? marketAvg
                              : marketAvg.toFixed(2)
                          )}{" "}
                          টাকা
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-6 text-center text-gray-400 font-medium"
                    >
                      কোনো বাজারের তথ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom Category Navigation Button */}
        <div className="pt-2">
          <Link
            href={`/categories/${product.category}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-sm rounded-xl transition-colors"
          >
            <span>{product.categoryIcon}</span>
            <span>সব {product.categoryNameBn}</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailsPage;