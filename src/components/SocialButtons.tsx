"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons() {
 const handleGithub = async () => {
await authClient.signIn.social({ provider: "github", callbackURL: "/" });
 };

 const handleGoogle = async () => {
 await authClient.signIn.social({ provider: "google", callbackURL: "/" });
 };

 return (
 <div className="w-full">
 <div className="divider text-xs text-base-content/60">অথবা</div>

<div className="grid grid-cols-2 gap-3">
 <button
 type="button"
onClick={handleGoogle}
 className="btn btn-outline min-w-0 whitespace-nowrap px-2 text-sm"
>
 <FcGoogle className="h-5 w-5" />
 Google দিয়ে চালিয়ে যান
 </button>

 <button
 type="button"
  onClick={handleGithub}
 className="btn btn-outline min-w-0 whitespace-nowrap px-2 text-sm"
 >
 <FaGithub className="h-5 w-5" />
GitHub দিয়ে চালিয়ে যান
 </button>
  </div>
 </div>
 );
}

