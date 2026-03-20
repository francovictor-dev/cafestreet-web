import { cn, formatBRLCurrency, ratingAverage } from "@/lib/utils";
import { Star } from "lucide-react";
import { motion, MotionProps } from "motion/react";
import Image from "next/image";
import { HtmlHTMLAttributes } from "react";

type ProductCardProps = {
  product: Product;
  className?: HtmlHTMLAttributes<"div">["className"];
  onClick?: () => void;
  mode?: "borded" | "normal";
} & MotionProps;

export default function ProductCard({
  product,
  className,
  mode = "borded",
  onClick,
  ...rest
}: ProductCardProps) {
  return (
    <motion.article
      className={cn(
        `w-[343] min-w-[343] min-h-[373] rounded-[12] bg-white/50 backdrop-blur-md ${mode == "borded" ? "p-1.5" : "p-0"} cursor-pointer max-lg:w-[243] max-lg:min-w-[243] max-lg:min-h-[273] shadow-lg`,
        className,
      )}
      onClick={onClick}
      style={{ y: -100 }}
      whileHover={{ scale: 1.04 }}
      {...rest}
    >
      <div className="bg-white rounded-[12] w-full h-full flex flex-col pt-6 px-4 pb-2 gap-4">
        <div className="absolute top-10 left-8 h-7 w-16 rounded-full flex flex-row gap-1 bg-white items-center justify-center">
          <p className="body-md-bold">{ratingAverage(product.ratings ?? [])}</p>
          <Star size={16} className="fill-primary-500 text-primary-500" />
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
  );
}
