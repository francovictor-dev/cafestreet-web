import { CircleMinus, CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { IconButton } from "./ui/icon-button";

type CounterType = {
  initialValue: number;
  onChange: (value: number) => void;
};

export default function Counter({ onChange, initialValue }: CounterType) {
  const [value, setValue] = useState(initialValue);

  const increase = () => {
    setValue(value + 1);
  };

  const decrease = () => {
    if (value == 0) return;
    setValue(value - 1);
  };

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div className="flex flex-row items-center gap-4 ">
      <IconButton onClick={decrease}>
        <CircleMinus />
      </IconButton>
      <p>{value}</p>
      <IconButton onClick={increase}>
        <CirclePlus />
      </IconButton>
    </div>
  );
}
