import {
  House,
  Landmark,
  List,
  Settings,
  SquareChartGantt,
} from "lucide-react";

export const options: { href: string; icon: React.ReactNode; title: string }[] =
  [
    {
      href: "home",
      icon: <House className="text-bw-600" />,
      title: "home",
    },
    {
      href: "",
      icon: <SquareChartGantt className="text-bw-600" />,
      title: "Gerenciar",
    },
    {
      href: "products",
      icon: <List className="text-bw-600" />,
      title: "Produtos",
    },
    {
      href: "",
      icon: <Landmark className="text-bw-600" />,
      title: "Pagamentos",
    },
    {
      href: "",
      icon: <Settings className="text-bw-600" />,
      title: "Configurações",
    },
  ];
