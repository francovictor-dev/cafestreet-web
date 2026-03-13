"use client";

import { Spinner } from "@/components/ui/spinner";
import { setLoadingHandlers } from "@/services/screen-loader";

import { AnimatePresence, motion } from "motion/react";
import { Activity, createContext, useEffect, useState } from "react";

const LoadingContext = createContext({});

export const LoadingProvider = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const show = (message?: string) => {
    setIsLoading(true);
    setMessage(message ?? "");
  };

  const close = () => {
    setIsLoading(false);
    setMessage("");
  };

  useEffect(() => {
    setLoadingHandlers(show, close);
  }, []);

  return (
    <LoadingContext value={{}}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            className="w-screen h-screen inset-0 fixed bg-black/50 backdrop-blur-xs z-999 flex flex-col gap-2 items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Spinner className="size-14 text-secondary-600" />
            <Activity mode={message?.length > 0 ? "visible" : "hidden"}>
              <p className="heading-sm text-secondary-600">{message}</p>
            </Activity>
          </motion.div>
        )}
      </AnimatePresence>
    </LoadingContext>
  );
};
