"use client";

import { ReactNode, createContext, useCallback, useState } from "react";

interface NavSubmenuRootProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

interface NavSubmenuRootContextProps {
  isOpen: boolean;
  toggle: () => void;
}

export const NavSubmenuRootContext = createContext<NavSubmenuRootContextProps>(
  {} as NavSubmenuRootContextProps,
);

export function NavSubmenuRoot({ children, defaultOpen }: NavSubmenuRootProps) {
  const [isOpen, setIsOpen] = useState(!!defaultOpen);

  const toggle = useCallback(() => setIsOpen((c) => !c), []);

  return (
    <NavSubmenuRootContext.Provider value={{ isOpen, toggle }}>
      <div>{children}</div>
    </NavSubmenuRootContext.Provider>
  );
}
