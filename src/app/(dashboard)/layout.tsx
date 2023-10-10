"use client";

import { links } from "@/lib/links";
import { Nav } from "@/components/Nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen w-full flex gap-4 p-6">
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

      <main>{children}</main>
    </section>
  );
}
