import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 500): T {
  const [bouncedValue, setBouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setBouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return bouncedValue;
}
