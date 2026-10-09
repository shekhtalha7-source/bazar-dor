import Link from "next/link";
import RedirectToSignIn from "@/components/RedirectToSignIn";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { getSession } from "@/lib/session";

export default async function UpdateProfilePage() {
  const session = await getSession();
  if (!session) return <RedirectToSignIn />;

  return (
    <main className="mx-auto max-w-md space-y-4 px-4 py-8">
      <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <UpdateProfileForm currentName={session.user.name ?? ""} />
      <Link href="/profile" className="block text-center text-sm text-base-content/60">
        ← প্রোফাইলে ফিরে যান
      </Link>
    </main>
  );
}