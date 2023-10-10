import { Boxes, User } from "lucide-react";

export const links = [
  {
    id: 1,
    name: "Usuários",
    href: "/dashboard/users",
    Icon: User,
  },
  {
    id: 2,
    name: "Patrimônio",
    Icon: User,
    children: [
      {
        id: 3,
        name: "Bens",
        href: "/dashboard/patrimonio/bens",
        Icon: Boxes,
      },
    ],
  },
];
