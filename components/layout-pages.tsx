"use client";

import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSelectedLayoutSegment } from "next/navigation";
import { useContext, useEffect, useRef } from "react";

export default function PageTrasition(props: MotionProps) {
  const segment = useSelectedLayoutSegment();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={segment} {...props}>
        <FrozenRouter>{props.children as any}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}

export function usePreviousValue<T>(value: T): T | undefined {
  const prevValue = useRef<T>(undefined);

  useEffect(() => {
    prevValue.current = value;
    return () => {
      prevValue.current = undefined;
    };
  });

  return prevValue.current;
}

export function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const prevContext = usePreviousValue(context) || null;

  const segment = useSelectedLayoutSegment();
  const prevSegment = usePreviousValue(segment);

  const changed =
    segment !== prevSegment &&
    segment !== undefined &&
    prevSegment !== undefined;

  return (
    <LayoutRouterContext.Provider value={changed ? prevContext : context}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}
