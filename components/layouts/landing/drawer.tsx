import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Dot } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const paths = [
  {
    name: "Sobre nós",
  },
  {
    name: "Produtos",
  },
  {
    name: "Login",
  },
];

export function DrawerScrollableContent({ children }: { children: ReactNode }) {
  return (
    <Drawer direction="right" dismissible>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
          <DrawerDescription>Escolha a seção</DrawerDescription>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4">
          {paths.map((item, index) => (
            <Link key={index} href={""} className="flex flex-col">
              <div className="flex flex-row gap-2 items-center">
                <Dot />
                <p className="my-3">{item.name}</p>
              </div>
              <Separator />
            </Link>
          ))}
        </div>
        <DrawerFooter>
          {/*       <Button>Submit</Button> */}
          <DrawerClose asChild>
            <Button variant="outline">Fechar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
