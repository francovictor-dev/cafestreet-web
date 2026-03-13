"use client";

import { IconButton } from "@/components/ui/icon-button";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LayoutGrid } from "lucide-react";
import { Variants } from "motion";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { options } from "./options-items";

const SideBar = () => {
  const [hide, setHide] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { push } = useRouter();

  const menuButtonVariants: Variants = {
    hide: {
      rotate: 270,
      transition: {
        type: "spring",
        duration: 1,
      },
    },
    open: {
      rotate: 0,
      transition: {
        type: "spring",
        duration: 1,
      },
    },
  };

  const menuVariants: Variants = {
    hide: {
      y: 0,
      height: 65,
      transition: {
        ease: "circInOut",
        duration: 0.5,
      },
    },
    open: {
      y: 0,
      height: 340,
      transition: {
        ease: "circInOut",
        duration: 0.5,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <div className="sticky top-6 max-sm:fixed">
        <motion.div
          className="bg-primary-200 rounded-full p-2 pb-4 flex flex-col gap-2 items-center justify-around overflow-hidden"
          variants={menuVariants}
          initial={{ y: 50 }}
          exit={{ y: 50 }}
          animate={hide ? "hide" : "open"}
        >
          <motion.div
            className="bg-bw-600 rounded-full p-3 flex justify-center items-center cursor-pointer"
            variants={menuButtonVariants}
            animate={hide ? "open" : "hide"}
            onTapStart={() => setHide(!hide)}
            whileHover={{ opacity: 0.8 }}
          >
            <LayoutGrid className="text-bw-300" />
          </motion.div>

          {options.map((option, index) => (
            <Tooltip key={index}>
              <TooltipTrigger>
                <IconButton
                  className={`${activeIndex == index && "bg-bw-300/30"}`}
                  onClick={() => {
                    push(option.href);
                    setActiveIndex(index);
                  }}
                >
                  {option.icon}
                </IconButton>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{option.title}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SideBar;
