"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SortSelect() {
 const router = useRouter();
 const pathname = usePathname();
 const params = useSearchParams();
 const current = params.get("sort") ?? "default";

 return (
 <div className="flex items-center justify-end gap-2">
 <label className="text-sm text-base-content/60">সাজান</label>
 <select
 value={current}
 onChange={(e) => router.push(`${pathname}?sort=${e.target.value}`)}
  className="select select-bordered select-sm bg-base-100"
 >
 <option value="default">ডিফল্ট</option>
 <option value="price-asc">দাম: কম থেকে বেশি</option>
<option value="price-desc">দাম: বেশি থেকে কম</option>
 </select>
 </div>
 );
}