import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import { Toaster } from "react-hot-toast";
import SiteShell from "@/components/SiteShell";
import "./globals.css";

const bangla = Noto_Sans_Bengali({
 subsets: ["bengali", "latin"],
 weight: ["400", "500", "600", "700"],
variable: "--font-bangla",
});

export const metadata: Metadata = {
 title: "বাজার দর",
 description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <html lang="bn" data-theme="light">
 <body className={`${bangla.variable} antialiased`}>
 <SiteShell>{children}</SiteShell>
 <Toaster position="top-center" />
 </body>
 </html>
);
}