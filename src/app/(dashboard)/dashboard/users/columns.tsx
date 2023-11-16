import { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "E-Mail",
  },
];
