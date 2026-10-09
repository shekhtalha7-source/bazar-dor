"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RedirectToSignIn() {
  const router = useRouter();

  useEffect(() => {
    toast.error("এই পেজ দেখতে আগে সাইন ইন করুন");
    router.replace("/signin");
  }, [router]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 text-center">
      <p className="text-base-content/60">সাইন ইন পেজে নেওয়া হচ্ছে...</p>
    </main>
  );
}