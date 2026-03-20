"use client";

import { DialogEditProductForm } from "@/components/products/dialog-edit-form";
import { SimpleDialog } from "@/components/simple-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteProduct } from "@/hooks/api/use-products";
import { dialog } from "@/services/dialog";
import { loading } from "@/services/screen-loader";
import { ColumnDef } from "@tanstack/react-table";
import { clsx, type ClassValue } from "clsx";
import { AlertTriangle, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getColumns(
  deleteMutation: ReturnType<typeof useDeleteProduct>,
) {
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "photoUrl",
      header: "Imagem",
      cell: ({ getValue }) => {
        const value = getValue<string>();

        return (
          <Image
            src={value}
            alt="Imagem"
            height={100}
            width={100}
            style={{
              objectFit: "cover",
              borderRadius: 16,
              minWidth: 100,
              height: 100,
              width: 100,
            }}
          />
        );
      },
    },
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ getValue }) => {
        return (
          <p className=" whitespace-normal wrap-break-word">
            {getValue<string>()}
          </p>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "Preço",
      cell: ({ getValue }) => {
        const value = getValue<number>();
        return parseBRLCurrency(value);
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Opções</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={
                  () => dialog.show(<DialogEditProductForm {...product} />)
                  //navigator.clipboard.writeText(product.id.toString())
                }
              >
                Editar
              </DropdownMenuItem>
              {/*  <DropdownMenuSeparator /> */}
              <DropdownMenuItem
                onClick={() =>
                  dialog.show(
                    <SimpleDialog
                      icon={
                        <AlertTriangle size={32} className="text-primary-500" />
                      }
                      title={<p className="heading-md">Certeza disso?</p>}
                      text={
                        <p>
                          Se confirmar será apagado definitavamente e não poderá
                          ser utilizado novamente! <b>Gostaria confirmar?</b>
                        </p>
                      }
                      button={
                        <Button
                          onClick={async () => {
                            loading.show();
                            try {
                              await deleteMutation.mutateAsync(product.id);
                              dialog.close();
                              toast.success("Deletado com sucesso!");
                            } catch (e) {
                              toast.error("Erro ao deletar produto");
                              console.error(e);
                            } finally {
                              loading.close();
                            }
                          }}
                        >
                          Confirmar
                        </Button>
                      }
                    />,
                  )
                }
              >
                Deletar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return columns;
}

export function parseBRLCurrency(amount: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

export function parseCurrencyToNumber(value: string) {
  if (!value) return 0;

  const cleaned = value
    .replace(/[^\d,.-]/g, "") // remove tudo que não é número, vírgula, ponto ou traço
    .replace(/\./g, "")
    .replace(",", ".");

  const number = Number(cleaned);

  return isNaN(number) ? 0 : number;
}

export function formatBRLCurrency(value: number) {
  const number =
    typeof value === "string" ? parseCurrencyToNumber(value) : value;

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function ratingAverage(ratings: Rating[]) {
  if (ratings.length == 0) return (0).toFixed(1);
  const divider = ratings.length;
  const sum = ratings.map((e) => e.star).reduce((prev, curr) => prev + curr, 0);
  return (sum / divider).toFixed(1);
}
