
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({ currentName }: { currentName: string }) {
 const [name, setName] = useState(currentName);
 const [loading, setLoading] = useState(false);
 const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setLoading(true);
 const { error } = await authClient.updateUser({ name });
 setLoading(false);
if (error) {
 toast.error("আপডেট করা যায়নি");
 return;
 }
 toast.success("নাম আপডেট হয়েছে");
 router.refresh();
 };
 return (
  <form onSubmit={handleSubmit} className="space-y-3">
 <label className="block text-sm">নাম</label>
 <input
 value={name}
 onChange={(e) => setName(e.target.value)}
 className="input input-bordered w-full" required /> <button type="submit" disabled={loading} className="btn btn-primary w-full"> {loading ? "অপেক্ষা করুন..." : "আপডেট"} </button>
 </form> );
}