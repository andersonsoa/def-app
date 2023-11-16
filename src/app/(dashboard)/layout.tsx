"use client";

import { links } from "@/lib/links";
import { Nav } from "@/components/Nav";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen w-full grid grid-rows-[auto,1fr] bg-zinc-200">
      <header className="text-2xl px-4 h-16 flex items-center">
        <div className="bg-emerald-500 px-2 rounded shadow-md text-white">
          DPE
        </div>
      </header>

      <main className="flex gap-4 px-4 pb-4 h-full">
        <aside className="w-full max-w-[280px]">
          <Nav.Root>
            {links.map((link) =>
              link.hasChildren ? (
                <Nav.SubmenuRoot key={link.name}>
                  <Nav.SubmenuButton text={link.name} icon={link.Icon} />
                  <Nav.SubmenuContent>
                    {link.children.map((subLink) => (
                      <Nav.Link
                        key={`${link.name}__${subLink.name}`}
                        icon={subLink.Icon}
                        href={subLink.href}
                      >
                        {subLink.name}
                      </Nav.Link>
                    ))}
                  </Nav.SubmenuContent>
                </Nav.SubmenuRoot>
              ) : (
                <Nav.Link key={link.name} icon={link.Icon} href={link.href}>
                  {link.name}
                </Nav.Link>
              ),
            )}
          </Nav.Root>
        </aside>

        <Suspense fallback={"..."}>{children}</Suspense>
      </main>
    </section>
  );
}
