import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 text-center">
      <p className="text-6xl">🛒</p>
      <h1 className="mt-4 text-4xl font-bold">৪০৪</h1>
      <p className="mt-2 text-base-content/60">
        দুঃখিত, এই পেজটি খুঁজে পাওয়া যায়নি।
      </p>
      <Link href="/" className="btn btn-primary mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}