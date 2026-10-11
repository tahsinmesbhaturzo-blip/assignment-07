import ProductList from "@/components/shared/ProductList";
import { ProductItem } from "@/types/ProductType";

type Props = {
  params: Promise<{ categoriesId: string }>;
};

const toBnDigit = (num: number | string): string => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  return num
    .toString()
    .replace(/\d/g, (digit) => bnDigits[parseInt(digit, 10)]);
};

const ProductCategories = async ({ params }: Props) => {
  const { categoriesId } = await params;

  const response = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${categoriesId}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const products: ProductItem[] = await response.json();

  const categoryName = products?.[0]?.categoryNameBn;
  const categoryIcon = products?.[0]?.categoryIcon;

  return (
    <div className="bg-[#F0F5F0] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-5">
        
       
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          {categoryIcon && (
            <div className="w-12 h-12 relative flex-shrink-0 flex items-center justify-center">
              <span className="text-4xl">{categoryIcon}</span>
            </div>
          )}

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {categoryName}
            </h1>

            <p className="text-sm text-gray-500 mt-0.5">
              {toBnDigit(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        
        <ProductList products={products} />
        
      </div>
    </div>
  );
};

export default ProductCategories;