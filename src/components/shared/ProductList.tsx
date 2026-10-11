"use client";

import { useState } from "react";
import ProductCard from "@/components/shared/ProductCard";
import { ProductItem } from "@/types/ProductType";

type SortOption = "default" | "price-low" | "price-high";

type Props = {
  products: ProductItem[];
};

const ProductList = ({ products }: Props) => {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.today - b.today;
    }

    if (sortBy === "price-high") {
      return b.today - a.today;
    }

    return 0;
  });

  return (
    <>
      
      <div className="flex justify-between items-center text-sm text-gray-600 px-1 pt-2">
        <div>
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
        </div>

        
        <div className="flex items-center gap-2">
          <span className="text-gray-600">সাজান</span>

          <div className="relative inline-block">
            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortOption)
              }
              className="appearance-none inline-flex items-center gap-2 px-3 py-1.5 pr-8 bg-white text-xs font-semibold text-gray-800 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 focus:outline-none cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-low">দাম: কম → বেশি</option>
              <option value="price-high">দাম: বেশি → কম</option>
            </select>

            <svg
              className="w-3.5 h-3.5 text-gray-600 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </>
  );
};

export default ProductList;