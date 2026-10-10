"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

export default function NavLinksClient({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  return (
    <nav className="border-t border-base-300">
      <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
        {categories.map((c) => {
          const active = pathname === `/category/${c.slug}`;
          return (
            <li key={c.id} className="shrink-0">
              <Link
                href={`/category/${c.slug}`}
                className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm whitespace-nowrap transition ${
                  active ? "bg-primary font-medium text-primary-content" : "hover:bg-base-200"
                }`}
              >
                <span>{c.icon}</span>
                {c.nameBn}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}















 