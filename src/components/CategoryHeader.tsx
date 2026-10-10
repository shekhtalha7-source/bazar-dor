import { toBn } from "@/lib/bn";

export default function CategoryHeader({
 icon,
 name,
 count,
}: {
 icon: string;
 name: string;
 count: number;
}) {
 return (
 <div className="mb-4 flex items-center gap-4 rounded-box border border-base-300 bg-base-100 p-5">
 <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-base-200 text-3xl">
 {icon}
 </span>
 <div>
 <h1 className="text-2xl font-bold">{name}</h1>
 <p className="text-sm text-base-content/60">
 {toBn(count)}টি পণ্যের আজকের দাম ও পরিবর্তন
 </p>
 </div>
 </div>
 );
}