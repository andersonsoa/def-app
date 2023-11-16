"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export type User = {
  id: number;
  name: string;
  email: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "E-Mail",
  },
  {
    id: "action",
    cell({ row }) {
      return (
        <button
          onClick={() => {
            console.log(`editando usuario ${row.getValue("id")}`);
          }}
        >
          <MoreHorizontal />
        </button>
      );
    },
  },
];
