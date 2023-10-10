"use client";

import { NavSubmenuRootContext } from "@/components/Nav/NavSubmenuRoot";
import { ReactNode, useContext } from "react";

interface NavSubmenuContentProps {
  children: ReactNode;
}

export function NavSubmenuContent({ children }: NavSubmenuContentProps) {
  const { isOpen } = useContext(NavSubmenuRootContext);

  return (
    <div data-show={isOpen} className="data-[show=true]:flex hidden">
      <div className="w-8 relative">
        <div className="h-full w-[2px] bg-blue-500/50 absolute inset-y-0 left-[50%] translate-x-[50%] rounded-full" />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
