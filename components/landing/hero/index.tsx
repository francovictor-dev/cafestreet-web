"use client";

import { Button } from "@/components/ui/button";
import { formatBRLCurrency, ratingAverage } from "@/lib/utils";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

export default function HeroSection({ products }: { products: Product[] }) {
  if (!products) return <></>;

  return (
    <section className="w-full h-screen bg-primary-300 flex flex-row">
      <Image
        className="w-[30%] z-0 absolute -bottom-[100px] left-0"
        src={"/images/img_coffes2.png"}
        alt=""
        width={2276}
        height={1576}
      />
      <div className="flex flex-1 flex-row items-center z-10 pb-60">
        <div className="flex flex-col gap-8 pl-[15%]">
          <p className="heading-xl text-white w-[80%]">
            Aproveite seu <span className="text-primary-600">café</span> antes
            da sua atividade
          </p>
          <p className="body-xl text-bw-400 leading-6 w-[90%]">
            Aumente sua produtividade e melhore seu humor com um copo de café
            pela manhã
          </p>

          <div>
            <Button className="bg-secondary-600 p-6">
              <ShoppingCart /> Peça agora
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center z-10 pb-50">
        <Image
          className="w-[60%]"
          src={"/images/img-hero.png"}
          alt="Imagem do hero"
          width={2172}
          height={1664}
        />
      </div>
      <div className="w-full absolute -bottom-[330px] flex justify-center items-center z-50">
        <div className="w-[1268] h-[330] bg-primary-400 rounded-4xl flex flex-row justify-center gap-10 ">
          {!!products &&
            products?.map((product, index) => (
              <motion.article
                key={product.id}
                className="w-[343] h-[373] rounded-[12] bg-white/50 backdrop-blur-md p-1.5 cursor-pointer"
                style={{ y: -100 }}
                whileHover={{ scale: 1.04 }}
              >
                <div className="bg-white rounded-[12] w-full h-full flex flex-col pt-6 px-4 pb-2 gap-4">
                  <div className="absolute top-10 left-8 h-7 w-16 rounded-full flex flex-row gap-1 bg-white items-center justify-center">
                    <p className="body-md-bold">
                      {ratingAverage(product.ratings ?? [])}
                    </p>
                    <Star
                      size={16}
                      className="fill-primary-500 text-primary-500"
                    />
                  </div>
                  <Image
                    className="w-full h-[65%] object-cover rounded-2xl"
                    src={product.photoUrl}
                    alt={product.name}
                    width={500}
                    height={500}
                  />
                  <div className="flex flex-col flex-1 justify-evenly">
                    <p className="heading-md font-black">{product.name}</p>
                    <p className="heading-sm font-semibold">
                      {formatBRLCurrency(product.amount)}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
        </div>
      </div>
    </section>
  );
}
