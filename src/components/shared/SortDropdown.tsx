"use client";

import { useState } from "react";

type SortOption = "default" | "price-low" | "price-high" | "name-asc" | "name-desc";

type Props = {
  onSort: (value: SortOption) => void;
};

const SortDropdown = ({ onSort }: Props) => {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const handleChange = (value: SortOption) => {
    setSortBy(value);
    onSort(value);
  };

  return (
    <div className="relative inline-block">
      <select
        value={sortBy}
        onChange={(event) =>
          handleChange(event.target.value as SortOption)
        }
        className="appearance-none inline-flex items-center gap-2 px-3 py-1.5 pr-8 bg-white text-xs font-semibold text-gray-800 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 focus:outline-none cursor-pointer"
      >
        <option value="default">ডিফল্ট</option>
        <option value="price-low">দাম: কম → বেশি</option>
        <option value="price-high">দাম: বেশি → কম</option>
        <option value="name-asc">নাম: ক → হ</option>
        <option value="name-desc">নাম: হ → ক</option>
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
  );
};

export default SortDropdown;