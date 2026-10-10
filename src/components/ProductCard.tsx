import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatChange, formatPrice, unitLabel } from "@/lib/bn";

export default function ProductCard({ product: p }: { product: Product }) {
 const color =p.change.dir === "up" ? "#dc2626" : p.change.dir === "down" ? "#16a34a" : "#6b7280";
const bg =
 p.change.dir === "up" ? "#fee2e2" : p.change.dir === "down" ? "#dcfce7" : "#f3f4f6";

return (
 <Link
href={`/products/${p.id}`}
 style={{
 display: "block",
 background: "#fff",
 border: "1px solid #dfe9e2",
 borderRadius: 12,
 padding: "12px 14px",
 textDecoration: "none",
 color: "inherit",
 }}
 > <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
 <span
 style={{
 width: 38,
 height: 38,
 borderRadius: 8,
 background: "#f0f5f1",
display: "flex",
 alignItems: "center",
 justifyContent: "center",
 fontSize: 20,
 }}
 >
 {p.image}
 </span>
 <div>
 <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>{p.nameBn}</div>
 <div style={{ fontSize: 11, color: "#6b7280" }}>{unitLabel(p.unit)}</div>
 </div>
 </div>

<div style={{
 display: "flex",
 justifyContent: "space-between",
 alignItems: "flex-end",
 marginTop: 10,
 }}>
 <div>
 <div style={{ fontSize: 11, color: "#6b7280" }}>আজকের দাম</div>
<div style={{ fontSize: 17, fontWeight: 700 }}> {formatPrice(p.today)} <span style={{ fontSize: 12, fontWeight: 400 }}>টাকা</span>
</div> </div>
<span
style={{
 fontSize: 11,
 fontWeight: 600,
padding: "2px 8px", borderRadius: 999,
 color,
 background: bg,
}}
 >
 {formatChange(p.change)}
</span>
</div>
 </Link> );
}