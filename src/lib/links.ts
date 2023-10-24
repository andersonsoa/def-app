import { Boxes, LucideIcon, User, Box, Truck, Cog } from "lucide-react";

type NavItemWithSub = {
  hasChildren: true;
  name: string;
  Icon: LucideIcon;
  children: Array<{
    name: string;
    Icon: LucideIcon;
    href: string;
  }>;
};

type NavItemWithoutSub = {
  hasChildren: false;
  name: string;
  Icon: LucideIcon;
  href: string;
};

type Links = NavItemWithSub | NavItemWithoutSub;

export const links: Links[] = [
  {
    hasChildren: true,
    name: "Patrimônio",
    Icon: Truck,
    children: [
      {
        name: "Bens",
        href: "/dashboard/patrimonio/bens",
        Icon: Boxes,
      },
      {
        name: "Inventário",
        href: "/dashboard/patrimonio/inventario",
        Icon: Box,
      },
    ],
  },
  {
    hasChildren: true,
    name: "Configurações",
    Icon: Cog,
    children: [
      {
        name: "Usuários",
        href: "/dashboard/users",
        Icon: User,
      },
    ],
  },
];
