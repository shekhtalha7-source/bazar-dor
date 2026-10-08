 "use client";

import toast from "react-hot-toast";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl space-y-4 p-6">
      <h1 className="text-3xl font-bold text-primary">🛒 বাজার দর</h1>
      <p>প্রয়োজনীয় পণ্যের দাম এক নজরে। ১২৩৪৫ টাকা</p>

      <div className="flex flex-wrap gap-2">
        <button className="btn btn-primary" onClick={() => toast.success("সফল হয়েছে!")}>
          Primary বাটন
        </button>
        <button className="btn btn-outline btn-primary">Outline বাটন</button>
        <button className="btn btn-error" onClick={() => toast.error("কিছু ভুল হয়েছে")}>
          Error বাটন
        </button>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">🍚 মিনিকেট চাল</h2>
          <p>প্রতি কেজি</p>
        </div>
      </div>

      <div className="skeleton h-20 w-full"></div>
    </main>
  );
}