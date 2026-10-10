import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import RedirectToSignIn from "@/components/RedirectToSignIn";
import { getProduct } from "@/lib/api";
import { toBn } from "@/lib/bn";

const UNIT_BN: Record<string, string> = {
 kg: "কেজি",
 litre: "লিটার",
 l: "লিটার",
 dozen: "ডজন",
 piece: "পিস",
 pcs: "পিস",
};
const unitBn = (u: string) => UNIT_BN[u.toLowerCase()] ?? u;

export default async function ProductDetailsPage({
 params,
}: {
 params: Promise<{ id: string }>;
}) {
 const session = await auth.api.getSession({ headers: await headers() });
 if (!session) return <RedirectToSignIn />;

 const { id } = await params;
 const p = await getProduct(id);

 if (!p) {
 return (
 <main className="mx-auto max-w-4xl px-4 py-16 text-center">
 <p className="text-6xl">🔍</p>
 <h1 className="mt-4 text-2xl font-bold">পণ্য পাওয়া যায়নি</h1>
 <Link href="/" className="btn btn-primary mt-6">
 হোম পেজে ফিরে যান
 </Link>
 </main>
 );
 }

 const unit = unitBn(p.unit);

 const diff = Math.abs(p.today - p.yesterday);
 const dirText =
 p.change.dir === "up" ? "বেড়েছে" : p.change.dir === "down" ? "কমেছে" : "অপরিবর্তিত";
 const dirColor =
 p.change.dir === "up"
 ? "text-error"
 : p.change.dir === "down"
 ? "text-success"
 : "text-base-content/60";
 const arrow = p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—";

 const mins = p.markets.map((m) => m.min);
 const maxs = p.markets.map((m) => m.max);
 const lowest = mins.length ? Math.min(...mins) : p.today;
 const highest = maxs.length ? Math.max(...maxs) : p.today;
 const avg = (m: { min: number; max: number }) =>
  Math.round(((m.min + m.max) / 2) * 100) / 100;

 return (
 <main className="mx-auto max-w-4xl space-y-5 px-4 py-6">
<nav className="flex items-center gap-2 text-xs text-base-content/60">
 <Link href="/" className="hover:underline">হোম</Link>
 <span></span>
 <Link href={`/category/${p.category}`} className="hover:underline">
 {p.categoryNameBn}
 </Link>
 <span></span>
 <span className="text-base-content">{p.nameBn}</span>
 </nav>

 <section className="flex flex-col gap-4 rounded-box border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center sm:justify-between">
 <div className="flex items-center gap-4">
 <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-base-200 text-3xl">
 {p.categoryIcon}
 </span>
 <div>
 <h1 className="text-2xl font-bold">{p.nameBn}</h1>
  <p className="text-sm text-base-content/60">
 প্রতি {unit} · {p.categoryNameBn}
 </p>
 <p className="mt-1 text-sm">
 গতকালের তুলনায় আজ দাম <b>{dirText}</b>
 {diff > 0 && <> · {toBn(diff)} টাকা</>}
 </p>
</div>
 </div>

 <div className="rounded-box bg-base-200 px-6 py-4 text-center">
     <p className="text-xs text-base-content/60">আজকের দাম</p>
 <p className="text-3xl font-bold">{toBn(p.today)}</p>
 <p className="text-xs text-base-content/60">টাকা / {unit}</p>
 <p className={`mt-1 text-xs font-semibold ${dirColor}`}>
 {arrow} {toBn(p.change.pct)}%
 </p>
 </div>
 </section>

 <section className="rounded-box border border-base-300 bg-base-100 p-5">
 <h2 className="mb-4 font-semibold">দামের সারসংক্ষেপ</h2>
 <div className="grid gap-3 sm:grid-cols-3">
 <div className="rounded-box border border-base-300 p-4">
 <p className="text-xs text-base-content/60">সর্বনিম্ন দাম</p>
 <p className="text-xl font-bold text-success">
 {toBn(lowest)} <span className="text-sm font-normal">টাকা</span>
 </p>
 <p className="text-xs text-base-content/60">সবচেয়ে কম দামের বাজার</p>
 </div>
 <div className="rounded-box border border-base-300 p-4">
 <p className="text-xs text-base-content/60">সর্বাধিক দাম</p>
 <p className="text-xl font-bold text-error">
 {toBn(highest)} <span className="text-sm font-normal">টাকা</span>
</p>
 <p className="text-xs text-base-content/60">সবচেয়ে বেশি দামের বাজার</p>
</div>
 <div className="rounded-box border border-base-300 p-4">
 <p className="text-xs text-base-content/60">গড় দাম</p>
 <p className="text-xl font-bold text-success">
{toBn(p.today)} <span className="text-sm font-normal">টাকা</span>
 </p>
<p className="text-xs text-base-content/60">প্রতি {unit} এর হিসাব</p> 
</div>
 </div>
 </section>

 <section className="rounded-box border border-base-300 bg-base-100 p-5">
 <h2 className="mb-4 font-semibold">বাজারভিত্তিক আজকের দাম</h2>
 <div className="overflow-x-auto rounded-box border border-base-300">
 <table className="table">
 <thead>
 <tr>
 <th>বাজার</th>
  <th>বিভাগ</th>
<th className="text-right">সর্বনিম্ন</th>
 <th className="text-right">সর্বাধিক</th>
<th className="text-right">গড়</th>
 </tr> </thead>
 <tbody>
 {p.markets.map((m, i) => (
 <tr key={i}>
 <td>{m.market}</td>
 <td>{m.division}</td>
 <td className="text-right">{toBn(m.min)} টাকা</td>
<td className="text-right">{toBn(m.max)} টাকা</td>
<td className="text-right font-bold">{toBn(avg(m))} টাকা</td>
</tr>
 ))}
</tbody>
</table>
</div>
 </section>
</main>
 );
}