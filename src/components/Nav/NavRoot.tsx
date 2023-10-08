import { ReactNode } from "react";

interface NavRoot {
  children: ReactNode;
}

export function NavRoot({ children }: NavRoot) {
  return <nav className="space-y-1">{children}</nav>;
}
