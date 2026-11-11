"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePath, navigationItems } from "./navigation";

const linkClassName =
  "rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function AppNav() {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-border bg-surface md:flex md:flex-col">
        <div className="border-b border-border px-5 py-6">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            Student Life
          </p>
          <p className="mt-1 text-lg font-semibold text-foreground">
            Pendamping akademik
          </p>
        </div>
        <nav aria-label="Utama" className="flex flex-1 flex-col gap-1 p-3">
          {navigationItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`${linkClassName} ${
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-foreground hover:bg-accent-soft/60"
                }`}
              >
                <span className="block">{item.label}</span>
                <span className="mt-0.5 block text-xs font-normal text-muted">
                  {item.description}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <nav
        aria-label="Utama"
        className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-surface md:hidden"
      >
        <ul className="grid grid-cols-3">
          {navigationItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-14 items-center justify-center px-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent ${
                    active ? "text-accent" : "text-muted"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
