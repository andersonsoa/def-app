import { Boxes, User } from "lucide-react";

export const links = [
  {
    name: "Usuários",
    href: "/dashboard/users",
    Icon: User,
  },
  {
    name: "Patrimônio",
    Icon: User,
    children: [
      {
        name: "Bens",
        href: "/dashboard/patrimonio/bens",
        Icon: Boxes,
      },
    ],
  },
];
