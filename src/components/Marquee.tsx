import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import type { Product } from "@/lib/types";
import { formatChange, formatPrice, unitShort } from "@/lib/bn";

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { next: { revalidate: 300 } }
  );
  const products: Product[] = await res.json();

  return (
    <div className="border-y border-base-300 bg-base-100">
      <MarqueeText className="py-2 text-sm" direction="left" duration={60}>
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.slug}`}
            className="mx-4 inline-flex items-center gap-2 hover:underline"
          >
            <span>{p.image}</span>
            <span className="font-medium">{p.nameBn}</span>
            <span>
              {formatPrice(p.today)} টাকা/{unitShort(p.unit)}
            </span>
            <span
              className={
                p.change.dir === "up"
                  ? "font-semibold text-error"
                  : p.change.dir === "down"
                  ? "font-semibold text-success"
                  : "text-base-content/60"
              }
            >
              {formatChange(p.change)}
            </span>
            <span className="ml-4 text-base-content/30">•</span>
          </Link>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;