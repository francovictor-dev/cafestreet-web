"use client";

import { Dialog } from "@/components/ui/dialog";
import { setDialogHandler } from "@/services/dialog";
import { createContext, ReactNode, useEffect, useState } from "react";

type DialogContextType = {};

const DialogContext = createContext({});

export const DialogProvider = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | undefined>();

  const show = (content: ReactNode) => {
    setContent(content);
    setOpen(true);
  };

  const close = () => {
    setContent(undefined);
    setOpen(false);
  };

  useEffect(() => {
    setDialogHandler(show, close);
  }, []);

  return (
    <DialogContext.Provider value={{}}>
      <Dialog
        open={open}
        onOpenChange={(value) => (value ? setOpen(true) : close())}
      >
        {content}
      </Dialog>
    </DialogContext.Provider>
  );
};
