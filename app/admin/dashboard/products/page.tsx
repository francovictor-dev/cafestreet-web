"use client";

import { deleteProduct, getProducts } from "@/api/product.api";
import { DataTable } from "@/components/products/data-table";
import { DialogAddForm } from "@/components/products/dialog-add-form";
import { Button } from "@/components/ui/button";
import {} from "@/components/ui/table";
import { useDeleteProduct, useProducts } from "@/hooks/api/use-products";
import { getColumns } from "@/lib/utils";
import { dialog } from "@/services/dialog";
import { Plus } from "lucide-react";

export default function DashboardProductPage() {
  const { data } = useProducts(getProducts);
  const deleteMutation = useDeleteProduct(deleteProduct);

  const handleAddProduct = () => {
    dialog.show(<DialogAddForm />);
  };

  return (
    <main className="px-2 pt-6">
      <p className="heading-md mb-6">Gestão de produtos</p>
      <div className="flex flex-col gap-4">
        <Button className="self-end" onClick={handleAddProduct}>
          <Plus /> Adicionar produto
        </Button>

        <DataTable columns={getColumns(deleteMutation)} data={data ?? []} />
      </div>
    </main>
  );
}
