"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UserInfo() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  if (isPending) return <div className="skeleton h-9 w-28" />;

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
          সাইন ইন
        </Link>
        <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-base-200"
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img  src={user.image || "/images.png"}  alt=""  referrerPolicy="no-referrer"  className="h-8 w-8 rounded-full object-cover"/>
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
  );
}