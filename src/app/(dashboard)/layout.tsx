"use client";

import { links } from "@/lib/links";
import { Nav } from "@/components/Nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen w-full grid grid-rows-[auto,1fr]">
      <header className="text-2xl h-16 grid place-content-center">DPE</header>
      <main className="flex gap-4 p-4 h-full">
        <aside className="w-full max-w-[280px]">
          <Nav.Root>
            {links.map((link) =>
              link.hasChildren ? (
                <Nav.SubmenuRoot key={link.name}>
                  <Nav.SubmenuButton text={link.name} icon={link.Icon} />
                  <Nav.SubmenuContent>
                    {link.children.map((subLink) => (
                      <Nav.Link
                        key={subLink.name}
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

        {children}
      </main>
    </section>
  );
}
