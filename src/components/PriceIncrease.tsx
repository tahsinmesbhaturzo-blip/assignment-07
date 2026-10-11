import { ProductItem } from "@/types/ProductType";
import { BiSolidUpArrow } from "react-icons/bi";
import ProductCard from "./shared/ProductCard";

const PriceIncrease = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { next: { revalidate: 60 } }
  );
  const data = await response.json();
  const filterProductData = data.filter(
    (data: ProductItem) => data.change.dir === "up"
  );
  const shortProductData = filterProductData.sort(
    (a: ProductItem, b: ProductItem) => {
      return b.change.pct - a.change.pct;
    }
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
     
      <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
        <span className="text-base sm:text-xl text-rose-600 bg-rose-100/60 p-2 rounded-xl flex items-center justify-center shrink-0">
          <BiSolidUpArrow />
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
          আজ দাম বেড়েছে
        </h1>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {shortProductData.slice(0, 6).map((product: ProductItem) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PriceIncrease;