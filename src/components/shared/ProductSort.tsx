"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { ProductItem } from "@/types/ProductType";

type Props = {
  products: ProductItem[];
};

const ProductSort = ({ products }: Props) => {
  const [sortType, setSortType] = useState("default");
  const [isOpen, setIsOpen] = useState(false);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === "low") {
      return Number(a.today) - Number(b.today);
    }

    if (sortType === "high") {
      return Number(b.today) - Number(a.today);
    }

    return 0;
  });

  const getSortName = () => {
    if (sortType === "low") return "দাম: কম থেকে বেশি";
    if (sortType === "high") return "দাম: বেশি থেকে কম";

    return "ডিফল্ট";
  };

  const handleSort = (type: string) => {
    setSortType(type);
    setIsOpen(false);
  };

  return (
    <>
     
      <div className="flex items-center gap-2">
        <span className="text-gray-600">সাজান</span>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white text-xs font-semibold text-gray-800 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 focus:outline-none"
          >
            {getSortName()}

            <svg
              className={`w-3.5 h-3.5 text-gray-600 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
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
          </button>

          {isOpen && (
            <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
              <button
                type="button"
                onClick={() => handleSort("default")}
                className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 ${
                  sortType === "default"
                    ? "bg-gray-50 font-semibold text-green-600"
                    : "text-gray-700"
                }`}
              >
                ডিফল্ট
              </button>

              <button
                type="button"
                onClick={() => handleSort("low")}
                className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 ${
                  sortType === "low"
                    ? "bg-gray-50 font-semibold text-green-600"
                    : "text-gray-700"
                }`}
              >
                দাম: কম থেকে বেশি
              </button>

              <button
                type="button"
                onClick={() => handleSort("high")}
                className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 ${
                  sortType === "high"
                    ? "bg-gray-50 font-semibold text-green-600"
                    : "text-gray-700"
                }`}
              >
                দাম: বেশি থেকে কম
              </button>
            </div>
          )}
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

export default ProductSort;