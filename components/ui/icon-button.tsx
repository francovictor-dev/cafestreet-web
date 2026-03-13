import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { tv } from "tailwind-variants";

const iconButtonTV = tv({
  base: "flex items-center justify-center hover:bg-bw-300 active:scale-90 active:opacity-50 rounded-full transition-all duration-200 ease-linear cursor-pointer",
  variants: {
    variant: {
      default: "",
      outline: "border border-bw-600",
    },
    size: {
      default: "p-3",
      sm: "p-2",
      lg: "p-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const iconButtonVariants = cva(iconButtonTV(), {
  variants: iconButtonTV.variants,
  defaultVariants: iconButtonTV.defaultVariants,
});

function IconButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof iconButtonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="icon-button"
      className={cn(iconButtonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { IconButton, iconButtonVariants };
