"use client";

import Link from "next/link";
import { ComponentProps, ElementType, ReactNode } from "react";

interface NavLinkProps extends ComponentProps<typeof Link> {
  children?: ReactNode;
  icon: ElementType;
}

export function NavLink({ children, icon: Icon, ...rest }: NavLinkProps) {
  return (
    <Link
      className={
        "flex items-center gap-4 dark:text-zinc-300 text-zinc-600 p-2 rounded hover:text-blue-400 hover:dark:text-blue-400 transition-all"
      }
      {...rest}
    >
      <Icon className="text-xl" />
      <span className="font-semibold text-sm tracking-wide">{children}</span>
    </Link>
  );
}
