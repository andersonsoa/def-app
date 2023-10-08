import { Boxes, LucideIcon, User, Truck } from "lucide-react";

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
    hasChildren: false,
    name: "Usuários",
    href: "/dashboard/users",
    Icon: User,
  },
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
    ],
  },
];
