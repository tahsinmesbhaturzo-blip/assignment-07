import React from 'react';

// Base Skeleton Component
interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200/80 rounded-md ${className}`}
    />
  );
};

// Top Header Navigation Skeleton
export const HeaderSkeleton: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Upper Bar */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-lg bg-emerald-100" />
          <Skeleton className="w-32 h-6" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="w-16 h-8 rounded-md" />
          <Skeleton className="w-24 h-8 rounded-md bg-emerald-200" />
        </div>
      </div>

      {/* Category Ticker Bar */}
      <div className="border-t border-gray-100 bg-gray-50/50 py-2 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-6 overflow-x-auto no-scrollbar">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="w-12 h-3" />
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

// Hero Banner Skeleton
export const HeroBannerSkeleton: React.FC = () => {
  return (
    <div className="bg-[#f2f7f3] rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 my-6 border border-emerald-50">
      <div className="flex-1 space-y-4 w-full">
        <Skeleton className="w-32 h-5 rounded-full bg-emerald-100" />
        <Skeleton className="w-3/4 h-9 sm:h-10 rounded-lg" />
        <Skeleton className="w-full sm:w-4/5 h-4 rounded" />
        <Skeleton className="w-2/3 h-4 rounded" />
        <Skeleton className="w-28 h-10 rounded-lg mt-4 bg-emerald-500/20" />
      </div>
      <div className="w-full md:w-64 h-44 flex items-center justify-center shrink-0">
        <Skeleton className="w-44 h-36 rounded-xl bg-amber-100/60" />
      </div>
    </div>
  );
};

// Single Product Item Card Skeleton
export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Skeleton className="w-10 h-10 rounded-full shrink-0 bg-gray-100" />
        <div className="space-y-2 flex-1 min-w-0">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-14 h-3 bg-gray-100" />
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <Skeleton className="w-16 h-5 rounded" />
        <Skeleton className="w-12 h-4 rounded-full bg-red-100/60" />
      </div>
    </div>
  );
};

// Product Section Layout Skeleton
interface SectionSkeletonProps {
  titleWidth?: string;
  count?: number;
}

export const ProductSectionSkeleton: React.FC<SectionSkeletonProps> = ({
  titleWidth = 'w-40',
  count = 6,
}) => {
  return (
    <section className="my-8">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="w-4 h-4 rounded-full bg-red-400" />
        <Skeleton className={`${titleWidth} h-6 rounded`} />
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    </section>
  );
};

// Complete Page Skeleton Component
export const PageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f7faf7] text-gray-800">
      {/* Navigation Bar */}
      <HeaderSkeleton />

      {/* Main Page Container */}
      <main className="max-w-6xl mx-auto px-4 py-4 space-y-8">
        {/* Banner Section */}
        <HeroBannerSkeleton />

        {/* Section 1: Dam Barheche */}
        <ProductSectionSkeleton titleWidth="w-36" count={6} />

        {/* Section 2: Dam Komeche */}
        <ProductSectionSkeleton titleWidth="w-36" count={6} />

        {/* Section 3: Sob Ponno */}
        <section className="my-8">
          <div className="mb-4 space-y-2">
            <Skeleton className="w-28 h-6" />
            <Skeleton className="w-48 h-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 24 }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer Skeleton */}
      <footer className="border-t border-gray-200 bg-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Skeleton className="w-48 h-4" />
          <Skeleton className="w-60 h-4" />
        </div>
      </footer>
    </div>
  );
};

export default PageSkeleton;