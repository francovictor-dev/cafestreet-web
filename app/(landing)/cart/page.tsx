"use client";

import { getProducts } from "@/api/product.api";
import { getMe } from "@/api/users.api";
import Counter from "@/components/counter";
import ProductCard from "@/components/product-card";
import { SimpleDialog } from "@/components/simple-dialog";
import { Button } from "@/components/ui/button";
import SimpleCard from "@/components/ui/simple-card";
import { useProducts } from "@/hooks/api/use-products";
import { useMe } from "@/hooks/api/use-user";
import { formatBRLCurrency } from "@/lib/utils";
import { dialog } from "@/services/dialog";
import { useCartItems, useCartStore } from "@/store";
import { AlertCircleIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useMemo } from "react";

export default function CartPage() {
  const cartItems = useCartItems();
  const { data: me } = useMe(getMe);
  const { data } = useProducts(getProducts);
  const { push } = useRouter();

  const productRests = useMemo(() => {
    return (data ?? []).filter(
      (e) => !cartItems.some((x) => x.product.id == e.id),
    );
  }, [cartItems]);

  const isAuthenticate = useMemo(() => {
    return me?.profile?.userType == "client" && !!me;
  }, [me]);

  const totalValue = useMemo(() => {
    return cartItems
      .map((item) => item.quantity * item.product.amount)
      .reduce((prev, curr) => prev + curr, 0);
  }, [cartItems]);

  const handleConfirm = async () => {
    if (!isAuthenticate) {
      return dialog.show(
        <SimpleDialog
          icon={<AlertCircleIcon size={30} />}
          text={<p>Faça o login para poder finalizar o pedido.</p>}
          title={<p className="heading-md">Você não está logado!</p>}
          button={
            <Button
              onClick={() => {
                push("/client/auth");
                dialog.close();
              }}
            >
              Fazer login
            </Button>
          }
        />,
      );
    }
  };

  return (
    <main className="flex flex-col bg-white min-h-screen w-full md:p-[5%] max-md:p-4  gap-6">
      <p className="heading-lg">Carrinho</p>
      <p className="heading-sm">
        Confira os itens no carrinho para finalizar o pedido
      </p>
      <SimpleCard className="flex flex-col gap-4 max-sm:items-start">
        <CartItemList cartItems={cartItems} />
      </SimpleCard>
      <p className="text-end mr-12 body-xl">
        Valor total: <b>{formatBRLCurrency(totalValue)}</b>
      </p>

      <p className="heading-sm my-6">Adicionar mais itens no carrinho</p>

      <div className="grid md:grid-cols-12 mt-20 space-x-4 space-y-4">
        <ProductList products={productRests} />
      </div>

      <Button
        disabled={cartItems.length == 0}
        onClick={handleConfirm}
        className="md:w-[25%] max-md:w-full self-center"
      >
        Fazer pedido
      </Button>
    </main>
  );
}

const CartItemList = memo(({ cartItems }: { cartItems: CartItem[] }) => {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <AnimatePresence>
      {cartItems.map((item) => (
        <motion.div
          key={item.id}
          className="flex sm:flex-row justify-between items-center max-sm:flex-col"
          exit={{ opacity: [1, 0, 0, 0], height: [100, 100, 0, 0] }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-row items-center gap-6">
            <Image
              className="h-[100] w-[100] rounded-2xl"
              src={item.product.photoUrl}
              alt=""
              width={100}
              height={100}
            />
            <div className="flex flex-col gap-4 max-md:gap-1">
              <p className="body-xl-bold">{item.product.name}</p>
              <p>{formatBRLCurrency(item.product.amount)}</p>
              <div className="sm:hidden">
                <Counter
                  initialValue={item.quantity}
                  onChange={(e) => {
                    updateQuantity(item.product.id, e);
                    if (e == 0) removeItem(item.product.id);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="max-sm:hidden">
            <Counter
              initialValue={item.quantity}
              onChange={(e) => {
                updateQuantity(item.product.id, e);
                if (e == 0) removeItem(item.product.id);
              }}
            />
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
});

const ProductList = memo(({ products }: { products: Product[] }) => {
  const { addItem } = useCartStore();

  return products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      mode="normal"
      className="lg:col-span-4 sm:w-[95%] h-10 sm:col-span-6 max-sm:col-span-12 max-sm:w-full max-md:h-[90%]"
      onClick={() =>
        addItem({
          id: product.id,
          product,
          quantity: 1,
        })
      }
    />
  ));
});
