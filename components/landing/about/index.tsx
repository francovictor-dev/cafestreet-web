"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <motion.section
      id="about"
      className="w-full  overflow-y-hidden bg-[url(/images/bg-image.png)] bg-cover flex flex-row"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex-1 flex justify-end lg:pr-16 max-md:hidden">
        {/* <div className="w-full"> */}
        <Image
          className="absolute h-[500] w-[360] mt-[-80]"
          src={"/images/img-about.png"}
          alt=""
          height={800}
          width={1083}
        />
        {/* </div> */}
      </div>
      <div className="flex-1 flex py-[84] flex-col gap-4 pl-16 max-md:px-4 max-md:gap-8">
        <p className="heading-md">Sobre nós</p>
        <p className="heading-md text-[20px] mt-6 w-[50%] leading-8 max-md:w-auto">
          Oferecemos café de qualidade, pronto para entrega.
        </p>
        <p className="w-[60%] text-bw-500 max-md:w-auto">
          Somos uma empresa que fabrica e distribui bebidas deliciosas. Nosso
          principal produto é feito com uma receita secreta e está disponível em
          lojas do mundo todo.
        </p>
        <div className="max-md:w-full">
          <Link href={"#product"}>
            <Button className="max-md:w-full">Obter um café</Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
