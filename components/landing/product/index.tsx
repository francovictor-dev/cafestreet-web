"use client";

import ProductCard from "@/components/product-card";
import { useCartStore } from "@/store";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function ProductSection({ products }: { products: Product[] }) {
  const { addItem } = useCartStore();
  const { push } = useRouter();

  return (
    <section
      id="product"
      className="md:min-h-screen md:mb-36 w-full pt-[8%] lg:px-[10%] md:px-[5%] max-md:px-4 max-md:h-auto max-md:mb-14"
    >
      <p className="heading-md mb-8">
        Menu para <span className="text-primary-600">você</span>
      </p>

      <motion.div className="grid grid-cols-12 space-x-8 space-y-6">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            mode="normal"
            className="col-span-4 h-[400] min-w-0 w-[90%] md:h-[300] max-lg:w-[90%] max-lg:min-w-0 max-md:col-span-6 max-md:w-[95%] max-sm:col-span-12 max-sm:w-full"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            onClick={() => {
              addItem({
                product: product,
                quantity: 1,
                id: index + 1,
              });
              push("/cart");
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}
