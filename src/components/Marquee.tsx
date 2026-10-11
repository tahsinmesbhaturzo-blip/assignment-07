import { ProductItem } from '@/types/ProductType';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import { LuCircleEqual } from 'react-icons/lu';
import MarqueeText from 'react-marquee-text';

const toBn = (num: number | string): string => {
  if (num === undefined || num === null) return '';
  return num
    .toString()
    .replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d)]);
};

const formatPrice = (price: number): string => {
  return price.toLocaleString('bn-BD');
};

const Marquee = async () => {
  
  const response = await fetch("https://openapi.programming-hero.com/api/bazardor/products",{next:{revalidate:60}});
  const data: ProductItem[] = await response.json();

  return (
    <div className="bg-gray-50/80 border-y border-gray-200 py-2 overflow-hidden text-gray-800">
      <MarqueeText pauseOnHover direction="right" duration={20}>
        <div className="flex items-center">
          {data.map((product) => {
            const isUp = product.change?.dir === 'up';
            const isDown = product.change?.dir === 'down';

            return (
              <div
                key={product.id}
                className="flex items-center gap-2 px-5 border-r border-gray-200 text-sm whitespace-nowrap"
              >
                
                <span className="text-base leading-none">
                  {product.image}
                </span>

                
                <span className="font-medium text-gray-900">
                  {product.nameBn}
                </span>

                
                <span className="text-gray-600">
                  {formatPrice(product.today)} টাকা/{product.unit}
                </span>

                
                {product.change && (
                  <span
                    className={`flex items-center gap-1 font-semibold ${
                      isUp
                        ? 'text-red-600'
                        : isDown
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }`}
                  >
                    <span>{isUp ? <BiSolidUpArrow /> : isDown ? <BiSolidDownArrow /> : <LuCircleEqual />}</span>
                    <span>{toBn(product.change.pct)}%</span>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;