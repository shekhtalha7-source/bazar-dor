"use client";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons() {
  const handleGithub = async () => {
    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
    if (error) toast.error(error.message || "GitHub লগইন করা যায়নি");
  };

  return (
    <>
      <div className="divider text-xs text-base-content/60">অথবা</div>
      <button
        type="button"
        onClick={handleGithub}
        className="btn btn-outline w-full"
      >
        GitHub দিয়ে চালিয়ে যান
      </button>
    </>
  );
}