import { getProducts } from "@/api/product.api";
import AboutSection from "@/components/landing/about";
import HeroSection from "@/components/landing/hero";
import ProductSection from "@/components/landing/product";
import ServiceSection from "@/components/landing/service";

export default async function Home() {
  const data = await getProducts();

  if (!data) return <></>;

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between bg-white">
      <HeroSection products={data.slice(0, 3)} />
      <ServiceSection />
      <AboutSection />
      <ProductSection products={data} />
    </main>
  );
}
