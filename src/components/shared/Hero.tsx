import Image from "next/image";
const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full"
  });

const Hero = () => {
  

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-[#f8faf8] border border-gray-200/80 rounded-3xl p-6 sm:p-10 md:p-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8 shadow-sm">
        
        {/* Text content area */}
        <div className="flex-1 space-y-4 max-w-2xl">
          {/* Date Badge */}
          <div className="inline-block bg-[#e8f5e9] text-[#1b5e20] text-sm font-semibold px-3 py-1 rounded-full">
            {date}
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight sm:leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle*/}
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Button */}
          <div className="pt-2">
            <a href="#allProducts" className="bg-[#008a45] hover:bg-[#007339] text-white font-medium text-sm sm:text-base px-5 py-2.5 rounded-lg transition-colors cursor-pointer shadow-sm">
              সব পণ্য দেখুন
            </a>
          </div>
        </div>

        {/* Image area */}
        <div className="flex-1 flex justify-center md:justify-end w-full max-w-xs sm:max-w-sm md:max-w-md">
          <Image
            src="/bazar-hero.png"
            alt="আজকের বাজার"
            width={380}
            height={320}
            priority
            className="w-full h-auto object-contain"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;