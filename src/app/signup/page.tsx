"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";




export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");

    if (!name || !email || !password) {
      toast.error("সব ঘর পূরণ করুন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirm) {
      toast.error("পাসওয়ার্ড দুটো মিলছে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন");
    router.push("/signin");
  };

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-center text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mb-6 text-center text-sm text-base-content/60">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-box border border-base-300 bg-base-100 p-5"
      >
        <label className="block">
          <span className="mb-1 block text-sm">নাম</span>
          <input name="name" className="input input-bordered w-full" placeholder="যেমন: রহিম উদ্দিন" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm">ইমেইল</span>
          <input name="email" type="email" className="input input-bordered w-full" placeholder="you@example.com" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm">পাসওয়ার্ড</span>
          <input name="password" type="password" className="input input-bordered w-full" placeholder="কমপক্ষে ৮ অক্ষর" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm">পাসওয়ার্ড নিশ্চিত করুন</span>
          <input name="confirm" type="password" className="input input-bordered w-full" placeholder="আবার লিখুন" />
        </label>

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
<SocialButtons />
        <p className="text-center text-sm">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-primary hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </form>

      <p className="mt-4 text-center text-sm text-base-content/60">
        <Link href="/">← হোম পেজে ফিরে যান</Link>
      </p>
    </main>
  );
}