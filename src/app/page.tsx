 import { getProducts } from "@/lib/api";
import { formatPrice, unitLabel, formatChange, priceSummary, toBn } from "@/lib/bn";

export default async function Home() {
  const products = await getProducts();
  const first = products[0];
  const s = priceSummary(first.markets);

  return (
    <main className="mx-auto max-w-6xl space-y-2 p-6">
     <h1 className="text-2xl font-bold">মোট পণ্য: {toBn(products.length)}টি</h1>
      <p>
        {first.image} {first.nameBn} ({unitLabel(first.unit)})
      </p>
      <p>
        আজকের দাম: {formatPrice(first.today)} টাকা {formatChange(first.change)}
      </p>
      <p>
        সর্বনিম্ন {formatPrice(s.min)}, সর্বোচ্চ {formatPrice(s.max)}, গড়{" "}
        {formatPrice(s.avg)}
      </p>
    </main>
  );
}