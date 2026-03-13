"use client";

import PageTrasition from "@/components/layout-pages";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, SquareMenu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DrawerScrollableContent } from "./drawer";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen">
      <Image
        className="w-[30%] z-0 absolute top-0 right-0 max-lg:hidden"
        src={"/images/img_coffes.png"}
        alt=""
        width={2072}
        height={1440}
      />
      <header className="w-full z-10 bg-primary-300 flex justify-center">
        <div className="flex flex-row w-[85%] h-25 items-center justify-between">
          <DrawerScrollableContent>
            <IconButton
              className="md:hidden"
              //onClick={handleOpenDrawerNavigation}
            >
              <SquareMenu size={32} />
            </IconButton>
          </DrawerScrollableContent>

          <Link href={""}>
            <Image
              className="cursor-pointer"
              src={"/images/logo_coffe.png"}
              alt="Logo"
              width={150}
              height={30}
              style={{ height: 30, width: 150 }}
            />
          </Link>

          <nav className="flex flex-row gap-6 max-md:hidden">
            <Link className="text-primary-600 hover:underline" href={""}>
              Sobre nós
            </Link>
            <Link className="hover:underline" href={""}>
              Nossos produtos
            </Link>
            <Link className="hover:underline" href={""}>
              Faça o login
            </Link>
          </nav>

          <div className="flex flex-row gap-3 items-center z-10">
            <div className="relative flex flex-row gap-1 items-center max-lg:hidden">
              <Search className="absolute ml-3" />
              <Input className="bg-white pl-12" placeholder="Busca..."></Input>
            </div>
            <IconButton>
              <ShoppingCart />
            </IconButton>
          </div>
        </div>
      </header>
      <div className="bg-primary-300 z-1">
        <PageTrasition
          style={{ width: "100%" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <div className="w-full ">{children}</div>
        </PageTrasition>
      </div>
    </div>
  );
}
