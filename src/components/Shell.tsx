import { Suspense } from "react";
import Header from "./Header";
import Marquee from "./Marquee";
import Footer from "./Footer";

export default function SiteShell({ children }: { children: React.ReactNode }) {
 return (
 <>
 <Suspense fallback={<div className="skeleton h-28 w-full" />}>
 <Header />
 </Suspense>
 <Suspense fallback={<div className="skeleton h-10 w-full" />}>
 <Marquee />
 </Suspense>
 <div className="min-h-[60vh]">{children}</div>
 <Footer />
 </>
 );
}