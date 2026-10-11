"use client"
import Link from "next/link";
import {
  Search,
  ShoppingBag,
  ArrowLeft,
  House,
  PackageSearch,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50 via-white to-orange-50 px-4 py-16">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-yellow-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl" />

      <div className="relative mx-auto w-full max-w-2xl text-center">
        {/* Shopping Illustration */}
        <div className="relative mx-auto mb-7 flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-300" />

          <div className="flex h-32 w-32 items-center justify-center rounded-[2rem] bg-amber-100 shadow-xl shadow-amber-200/50 sm:h-40 sm:w-40">
            <ShoppingBag
              className="h-16 w-16 text-amber-600 sm:h-20 sm:w-20"
              strokeWidth={1.5}
            />
          </div>

          <div className="absolute -right-1 top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500 text-white shadow-lg">
            <Search className="h-6 w-6" />
          </div>

          <div className="absolute -bottom-1 left-1 flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white shadow-lg">
            <PackageSearch className="h-5 w-5" />
          </div>
        </div>

        {/* Error Code */}
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-amber-600">
          Oops! Page Not Found
        </p>

        <h1 className="text-7xl font-black tracking-tight text-gray-900 sm:text-9xl">
          4<span className="text-amber-500">0</span>4
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-gray-800 sm:text-3xl">
          দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
          মনে হচ্ছে আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে,
          অথবা ঠিকানাটি ভুল হয়েছে। চলুন, আবার বাজার ঘুরে দেখি!
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-amber-500/25 transition duration-300 hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            <House className="h-5 w-5" />
            হোম পেজে ফিরে যান
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 font-semibold text-gray-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
          >
            <ArrowLeft className="h-5 w-5" />
            আগের পেজে ফিরুন
          </button>
        </div>

        {/* Bottom Message */}
        <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-amber-100 bg-white/80 px-4 py-2 text-sm text-gray-500 shadow-sm">
          <ShoppingBag className="h-4 w-4 text-amber-500" />
          <span>
            আপনার পছন্দের পণ্য খুঁজুন <span className="font-semibold text-amber-600">বাংলা বাজারে</span>
          </span>
        </div>
      </div>
    </main>
  );
}