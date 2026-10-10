"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

export default function NavLinksClient({ categories }: { categories: Category[] }) {
 const pathname = usePathname();

return (
 <nav className="border-t border-base-300">
 <ul className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-1">
{categories.map((c) => {
const active = pathname === `/category/${c.slug}`;
return (
 <li key={c.id} className="shrink-0">
<Link
 href={`/category/${c.slug}`}
className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs leading-5 whitespace-nowrap transition ${
 active
 ? "bg-primary font-medium text-primary-content"
 : "text-base-content hover:bg-base-200"
 }`}
>
 <span className="text-[10px]">{c.icon}</span>
 {c.nameBn}
</Link>
</li>
);
 })}
</ul>
 </nav>
);
}














 