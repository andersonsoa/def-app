"use client";

import { NavSubmenuRootContext } from "@/components/Nav/NavSubmenuRoot";
import { ComponentProps, ElementType, useContext } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface NavSubmenuButtonProps extends ComponentProps<"button"> {
  icon: ElementType;
  text?: string;
}

export function NavSubmenuButton({
  text,
  icon: Icon,
  ...rest
}: NavSubmenuButtonProps) {
  const { isOpen, toggle } = useContext(NavSubmenuRootContext);
  return (
    <button
      onClick={toggle}
      className="flex items-center gap-4 dark:text-zinc-300 text-zinc-600 p-2 rounded hover:text-blue-400 hover:dark:text-blue-400 transition-all w-full"
      {...rest}
    >
      <Icon className="text-xl" />
      <span className="font-semibold text-left text-sm tracking-wide flex-1">
        {text}
      </span>
      {isOpen ? (
        <ChevronUp className="text-xl" />
      ) : (
        <ChevronDown className="text-xl" />
      )}
    </button>
  );
}
