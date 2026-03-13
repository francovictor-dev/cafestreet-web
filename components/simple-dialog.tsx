"use client";

import { ReactNode } from "react";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type SimpleDialogType = {
  icon?: ReactNode;
  title: ReactNode;
  text: ReactNode;
  button: ReactNode;
};

export function SimpleDialog({ button, text, title, icon }: SimpleDialogType) {
  return (
    <DialogContent className="flex flex-col items-center">
      {icon ?? <></>}
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>

      {text}

      <DialogFooter>{button}</DialogFooter>
    </DialogContent>
  );
}
