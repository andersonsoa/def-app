"use client";

import Link from "next/link";
import { links } from "@/lib/links";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen w-full flex gap-4 p-6">
      <aside className="w-full max-w-[280px]">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href} className="bg-zinc-100">
              {link.href ? (
                <Link href={link.href}>
                  <div className="flex gap-2 items-center px-2 py-1 rounded">
                    <link.Icon className="w-4" />
                    <span className="text-sm">{link.name}</span>
                  </div>
                </Link>
              ) : (
                <>
                  <div className="flex gap-2 items-center px-2 py-1 rounded">
                    <link.Icon className="w-4" />
                    <span className="text-sm">{link.name}</span>
                  </div>

                  <ul>
                    {link.children?.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href}>
                          <div className="flex gap-2 items-center px-2 ml-4 py-1 rounded">
                            <child.Icon className="w-4" />
                            <span className="text-sm">{child.name}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
      </aside>

      <main>{children}</main>
    </section>
  );
}
