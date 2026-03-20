"use client";

import { motion } from "motion/react";
import Image from "next/image";

const images = [
  {
    src: "/images/coffee-cup.png",
    text1: "Escolha seu café",
    text2: "Há mais de 20 cafés para você.",
  },
  {
    src: "/images/food-truck.png",
    text1: "Nós enviaremos isso a você",
    text2: "Escolha o serviço de delivery.",
  },
  {
    src: "/images/coffe-choosed.png",
    text1: "Aproveite seu café",
    text2: "Bem simples.",
  },
];

export default function ServiceSection() {
  return (
    <section
      id="service"
      className="md:min-h-screen md:mb-36 w-full pt-[20%] lg:px-[10%] max-md:px-4 max-md:h-auto max-md:mb-14"
    >
      <p className="heading-md mb-14">
        Como usar o serviço de <span className="text-primary-600">entrega</span>
      </p>
      <div className="grid grid-cols-12 max-md:space-y-12">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="col-span-4 flex flex-col gap-4 items-center max-md:col-span-12"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Image
              className="mb-3"
              src={image.src}
              alt=""
              height={160}
              width={160}
            />
            <p className="heading-md text-center">{image.text1}</p>
            <p className="text-center">{image.text2}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
