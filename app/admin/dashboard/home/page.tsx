"use client";

import { getMe } from "@/api/users.api";
import { CoffeChart } from "@/components/admin/home/coffe-chart";
import { LatestEarningsChart } from "@/components/admin/home/latest earnings-chart";
import { RatingsChart } from "@/components/admin/home/ratings-chart";
import SimpleCard from "@/components/ui/simple-card";
import { useMe } from "@/hooks/api/use-user";
import { parseBRLCurrency } from "@/lib/utils";
import { Banknote, ChartColumn, TrendingDown, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardHomePage() {
  const Router = useRouter();
  const { data, error, isLoading } = useMe(getMe, {
    params: { relations: "profile" },
  });

  return (
    <main className="grid grid-cols-12 gap-6 pt-6">
      <SimpleCard className="lg:col-span-4 md:col-span-6 sm:col-span-6 max-sm:col-span-12 flex flex-col gap-4">
        <div className="flex flex-row items-center gap-4">
          <Banknote
            size={32}
            className="text-success-600 p-1.5 bg-bw-300/15 rounded-full"
          />
          <p className="body-xl font-medium">Vendas totais</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <p className="heading-sm font-medium">{parseBRLCurrency(400)}</p>
          <div className="flex flex-row gap-2 items-center text-success-600 body-md">
            <TrendingUp />
            <p className="">+10%</p>
            <p className="">Ultimo mês {parseBRLCurrency(200)}</p>
          </div>
        </div>
      </SimpleCard>

      <SimpleCard className="lg:col-span-4 md:col-span-6 sm:col-span-6 max-sm:col-span-12 flex flex-col gap-4">
        <div className="flex flex-row items-center gap-4">
          <ChartColumn size={32} className="p-1.5 bg-bw-300/15 rounded-full" />
          <p className="body-xl font-medium">Despesas</p>
        </div>
        <div className="flex flex-row items-center justify-between ">
          <p className="heading-sm font-medium">{parseBRLCurrency(200)}</p>
          <div className="flex flex-row gap-2 items-center text-danger-600 body-md">
            <TrendingDown />
            <p className="">-10%</p>
            <p className="">Ultimo mês {parseBRLCurrency(180)}</p>
          </div>
        </div>
      </SimpleCard>

      <SimpleCard className="lg:col-span-4 md:col-span-12 max-sm:col-span-12 row-span-2">
        <p className="body-xl font-medium">Ganhos nos últimos meses</p>
        <LatestEarningsChart />
      </SimpleCard>

      <SimpleCard className="lg:col-span-4 md:col-span-6 max-sm:col-span-12">
        <p className="body-xl font-medium">Produtos mais vendidos</p>
        <CoffeChart />
      </SimpleCard>

      <SimpleCard className="lg:col-span-4 md:col-span-6 max-sm:col-span-12">
        <p className="body-xl font-medium">Avaliação dos produtos</p>
        <RatingsChart />
      </SimpleCard>

      <SimpleCard className="col-span-8"></SimpleCard>
      <SimpleCard className="col-span-4"></SimpleCard>
    </main>
  );
}
