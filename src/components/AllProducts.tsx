import { ProductItem } from '@/types/ProductType';
import ProductCard from './shared/ProductCard';

const toBnDigit = (num: number | string): string => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => bnDigits[parseInt(digit, 10)]);
};

const AllProducts =async () => {
     const response = await fetch(
  "https://openapi.programming-hero.com/api/bazardor/products",
  { next: { revalidate: 60 } }
);

if (!response.ok) {
  throw new Error(`Products API failed: ${response.status}`);
}

const contentType = response.headers.get("content-type");

if (!contentType?.includes("application/json")) {
  throw new Error(`Expected JSON but received: ${contentType}`);
}

const data: ProductItem[] = await response.json();
          
    return (
        <section id='allProducts' className="scroll-mt-33 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
     
      <div className="flex  flex-col gap-4 sm:gap-3 mb-5 sm:mb-6">
        
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
          সব পণ্য
        </h1>
        <span className="text-md sm:text-xl text-gray-400">
          মোট {toBnDigit(data.length)} টি পণ্য দেখানো হচ্ছে
        </span>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {data.map((product: ProductItem) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
    );
};

export default AllProducts;