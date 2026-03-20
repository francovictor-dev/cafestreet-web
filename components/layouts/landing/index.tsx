"use client";

import Badge from "@/components/badge";
import PageTrasition from "@/components/layout-pages";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { useCartCount } from "@/store";
import { Search, ShoppingCart, SquareMenu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { DrawerScrollableContent } from "./drawer";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();
  const path = usePathname();

  const isHome = useMemo(() => {
    return path == "/";
  }, [path]);

  const cartItemCount = useCartCount();
  return (
    <div className="w-full min-h-screen">
      {isHome && (
        <Image
          className="w-[30%] z-0 absolute top-0 right-0 max-lg:hidden"
          src={"/images/img_coffes.png"}
          alt=""
          width={2072}
          height={1440}
          priority
        />
      )}
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

          <Link href={"/#home"}>
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
            <Link className="text-primary-600 hover:underline" href={"/#about"}>
              Sobre nós
            </Link>
            <Link className="hover:underline" href={"/#product"}>
              Nossos produtos
            </Link>
            <Link className="hover:underline" href={"/client/auth"}>
              Faça o login
            </Link>
          </nav>

          <div className="flex flex-row gap-3 items-center z-10">
            <div className="relative flex flex-row gap-1 items-center max-lg:hidden">
              <Search className="absolute ml-3" />
              <Input className="bg-white pl-12" placeholder="Busca..."></Input>
            </div>
            <IconButton onClick={() => push("/cart")}>
              <Badge value={cartItemCount == 0 ? undefined : cartItemCount}>
                <ShoppingCart />
              </Badge>
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
      <div className="flex flex-col w-full ">
        <div className="flex flex-row flex-1 bg-primary-300 py-10 px-8">
          <Link href={"#hero"} className="flex-1">
            <Image
              className="cursor-pointer"
              src={"/images/logo_coffe.png"}
              alt="Logo"
              width={150}
              height={30}
              style={{ height: 30, width: 150 }}
            />
          </Link>

          <div className="flex flex-col gap-2 flex-1 font-medium">
            <Link href={"#hero"}>Home</Link>
            <Link href={"#about"}>Sobre nós</Link>
            <Link href={"#product"}>Produtos</Link>
            <Link href={"/client/auth"}>Login</Link>
          </div>
        </div>
        <div className="flex flex-row flex-1 bg-primary-300 items-center justify-center py-4">
          <p>© 2026 Café Street </p>
        </div>
      </div>
    </div>
  );
}
