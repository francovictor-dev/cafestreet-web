import { ReactNode } from "react";

type BadgeType = {
  children: ReactNode;
  value?: number | undefined;
};

export default function Badge({ children, value }: BadgeType) {
  return (
    <div className="flex flex-row  justify-end">
      {!!value && (
        <div className=" flex absolute bg-danger-500 border-2 border-primary-300 h-4 w-4 rounded-full -mr-2 -mt-1 justify-center items-center">
          <p className="text-white body-sm font-bold">{value}</p>
        </div>
      )}
      {children}
    </div>
  );
}
