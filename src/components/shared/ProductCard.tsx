import { ProductItem } from "@/types/ProductType";
import Link from "next/link";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";


const toBnDigit = (num: number | string): string => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => bnDigits[parseInt(digit, 10)]);
};

const ProductCard = ({ product }: { product: ProductItem }) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  

  return (
    
    <Link href={`/product/${product.id}`}>
      <div className="flex flex-col justify-between p-4 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-200">

      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100/80 shrink-0">
          <span>{product.image}</span>
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-800 leading-tight">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            প্রতি {product.unit}
          </p>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <span className="text-xs text-gray-400 block font-normal mb-0.5">
            আজকের দাম
          </span>
          <div className="text-lg font-bold text-gray-900">
            {toBnDigit(product.today)} টাকা
          </div>
        </div>

      
        <div
          className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg ${
            isUp
              ? "bg-rose-100/70 text-rose-700"
              : isDown
              ? "bg-emerald-100/70 text-emerald-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <span className="text-[10px]">
            {isUp ? <BiSolidUpArrow /> : isDown ? <BiSolidDownArrow /> : "•"}
          </span>
          <span>{toBnDigit(product.change.pct)}%</span>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;