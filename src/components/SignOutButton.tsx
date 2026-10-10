"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
const router = useRouter();

 return (
 <button
 type="button"
 className="btn btn-outline btn-error btn-sm"
 onClick={async () => {
 await authClient.signOut();
 router.push("/");
 router.refresh();
 }}
 >
 সাইন আউট
</button>
);
}