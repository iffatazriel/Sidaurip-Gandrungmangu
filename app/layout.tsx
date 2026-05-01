import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Public_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Desa Sidaurip | Portal Resmi Desa",
  description:
    "Pusat informasi digital dan layanan terpadu satu pintu untuk seluruh warga Desa Sidaurip. Mandiri, Transparan, Profesional.",
  icons: {
    icon: "/Logo-Cilacap.png",
    apple: "/Logo-Cilacap.png",
      
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={cn("h-full", "scroll-smooth", "antialiased", plusJakarta.variable, publicSans.variable, "font-sans", geist.variable)}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-full bg-background text-on-surface">{children}</body>
    </html>
  );
}
