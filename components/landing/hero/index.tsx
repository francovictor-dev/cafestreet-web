"use client";

import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeroSection({ products }: { products: Product[] }) {
  const { addItem } = useCartStore();
  const { push } = useRouter();

  if (!products) return <></>;

  return (
    <section
      id="hero"
      className="w-full h-screen bg-primary-300 flex flex-row max-sm:h-[calc(84vh)]"
    >
      <Image
        className="w-[30%] z-0 absolute -bottom-[100px] left-0 max-md:hidden"
        src={"/images/img_coffes2.png"}
        alt=""
        width={2276}
        height={1576}
        priority
      />
      <div className="flex flex-1 flex-row items-center z-10 sm:pb-60 max-sm:pb-30">
        <div className="flex flex-col gap-8 sm:pl-[15%] max-sm:px-4">
          <p className="heading-xl text-white lg:w-[80%]  max-sm:text-center">
            Aproveite seu <span className="text-primary-600">café</span> antes
            da sua atividade
          </p>
          <p className="body-xl text-bw-400 leading-6 lg:w-[90%] max-sm:text-center">
            Aumente sua produtividade e melhore seu humor com um copo de café
            pela manhã
          </p>

          <Link href={"#product"}>
            <Button className="bg-secondary-600 p-6 max-sm:w-full">
              <ShoppingCart /> Peça agora
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center z-10 pb-50 max-sm:hidden">
        <Image
          className="w-[60%]"
          src={"/images/img-hero.png"}
          alt="Imagem do hero"
          width={2172}
          height={1664}
          priority
        />
      </div>
      <motion.div
        className="w-full absolute -bottom-[500px] flex justify-center items-center z-50 max-md:hidden"
        viewport={{ once: true }}
        whileInView={{ y: -180 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-[1268] h-[330] sm:bg-primary-400 rounded-4xl flex flex-row justify-center gap-10 max-sm:px-4 max-lg:gap-4 max-lg:h-[250] max-lg:w-[90%] max-lg:min-w-[880]">
          {!!products &&
            products?.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                onClick={() => {
                  addItem({ id: index + 1, product: product, quantity: 1 });
                  push("/cart");
                }}
              />
            ))}
        </div>
      </motion.div>
    </section>
  );
}
