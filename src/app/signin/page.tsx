"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";



export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল");
      return;
    }
    toast.success("সাইন ইন সফল হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-center text-2xl font-bold">সাইন ইন</h1>
      <p className="mb-6 text-center text-sm text-base-content/60">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-box border border-base-300 bg-base-100 p-5"
      >
        <label className="block">
          <span className="mb-1 block text-sm">ইমেইল</span>
          <input name="email" type="email" className="input input-bordered w-full" placeholder="you@example.com" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm">পাসওয়ার্ড</span>
          <input name="password" type="password" className="input input-bordered w-full" placeholder="আপনার পাসওয়ার্ড" />
        </label>

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
        </button>
<SocialButtons />
        <p className="text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </form>

      <p className="mt-4 text-center text-sm text-base-content/60">
        <Link href="/">← হোম পেজে ফিরে যান</Link>
      </p>
    </main>
  );
}