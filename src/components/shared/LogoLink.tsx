
"use client";

import Link from "next/link";
import { BsCart } from "react-icons/bs";

const date = new Date().toLocaleDateString("bn-BD", {
  dateStyle: "full",
});

const LogoLink = () => {
  return (
    <Link
      href="/"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      className="min-w-0 shrink"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Logo Icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#008a45] text-lg text-white shadow-sm sm:h-12 sm:w-12 sm:rounded-2xl sm:text-2xl">
          <BsCart />
        </div>

        {/* Title & Date */}
        <div className="min-w-0">
          <h1 className="truncate text-base font-bold leading-tight text-gray-900 sm:text-xl md:text-2xl">
            বাজার দর
          </h1>

          <span className="block truncate text-[10px] font-normal text-gray-500 sm:text-xs md:text-sm">
            {date}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default LogoLink;
