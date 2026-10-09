"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

import type { Category } from "@/lib/types";
import BnDate from "@/components/BnDate";

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  const user = session?.user;

  return (
    <header className="bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg text-primary-content">
            🛒
          </span>
          <span>
            <span className="block text-lg leading-tight font-bold">বাজার দর</span>
            <BnDate className="block text-xs text-base-content/60" />
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-9 w-28" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-base-200"
              >
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.image} alt="" className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm text-primary-content">
                    {user.name?.charAt(0)}
                  </span>
                )}
                <span className="hidden text-sm font-medium sm:inline">{user.name}</span>
                <span className="text-[10px]">▾</span>
              </div>
              <div
                tabIndex={0}
                className="dropdown-content z-50 mt-2 w-60 rounded-box border border-base-300 bg-base-100 p-3 shadow-lg"
              >
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="mb-2 truncate text-xs text-base-content/60">{user.email}</p>
                <Link href="/profile" className="block rounded px-2 py-1.5 text-sm hover:bg-base-200">
                  👤 আমার প্রোফাইল
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full rounded px-2 py-1.5 text-left text-sm text-error hover:bg-base-200"
                >
                  ↩ সাইন আউট
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

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
    </header>
  );
}