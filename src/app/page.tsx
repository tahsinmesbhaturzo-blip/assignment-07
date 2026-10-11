import AllProducts from "@/components/AllProducts";
import PriceDecrease from "@/components/PriceDecrease";
import PriceIncrease from "@/components/PriceIncrease";
import Hero from "@/components/shared/Hero";

const HomePage = () => {
  

  return (
    <div className="bg-[#F0F5F0]">
      <Hero></Hero>
      <PriceIncrease></PriceIncrease>
      <PriceDecrease></PriceDecrease>
      <AllProducts></AllProducts>
    </div>
  );
};

export default HomePage;