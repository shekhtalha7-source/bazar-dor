import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateProfileForm from "@/components/UpdateProfileFrom";
import SignOutButton from "@/components/SignOutButton";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");

  const { user } = session;

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-base-content/60">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="flex items-center gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name}
              className="h-16 w-16 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-base-200 text-xl font-bold">
              {user.name?.[0]?.toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-base-content/60">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </div>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="mb-4 font-semibold">তথ্য</h2>
        <UpdateProfileForm defaultName={user.name ?? ""} />
      </div>
    </main>
  );
}