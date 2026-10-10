import Image from "next/image";
import BnDate from "@/components/BnDate";


export default function Hero() {
  return (
    <section className="rounded-box border border-base-300 bg-base-100 p-6 sm:p-10">
      <div className="grid items-center gap-6 md:grid-cols-2">
        <div>
          <BnDate className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary" />
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-3 text-base-content/70">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
            গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary mt-5">
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex justify-center">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের ঝুড়ি"
            width={420}
            height={300}
            priority
            className="h-auto w-full max-w-sm"
          />
        </div>
      </div>
    </section>
  );
}