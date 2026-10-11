
"use client";

import { CategoryType } from "@/types/categoryType";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavLinks = () => {
  const pathname = usePathname();
  const [data, setData] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/categories"
      );

      const categories: CategoryType[] = await response.json();
      setData(categories);
    };

    fetchCategories();
  }, []);

  return (
    <nav>
      <ul className="flex items-center gap-1 sm:gap-3 md:gap-5 lg:gap-7">
        {data.map((category) => {
          const isActive = pathname === `/categories/${category.slug}`;

          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
            >
              <li
                className={`flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors sm:gap-2 sm:px-3 sm:text-sm md:text-base ${
                  isActive
                    ? "bg-green-100 text-[#008a45]"
                    : "text-gray-700 hover:bg-green-50 hover:text-[#008a45]"
                }`}
              >
                <span className="text-sm sm:text-base">
                  {category.icon}
                </span>

                <h3 className="whitespace-nowrap">
                  {category.nameBn}
                </h3>
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavLinks;
