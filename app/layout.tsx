import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://sidaurip.desa.id"),
  title: {
    default: "Desa Sidaurip | Portal Resmi Desa",
    template: "%s | Desa Sidaurip",
  },
  description:
    "Pusat informasi digital dan layanan terpadu satu pintu untuk seluruh warga Desa Sidaurip. Mandiri, Transparan, Profesional.",
  keywords: [
    "Desa Sidaurip",
    "Cilacap",
    "portal desa",
    "layanan desa",
    "informasi desa",
  ],
  authors: [{ name: "Pemerintah Desa Sidaurip" }],
  icons: {
    icon: [
      { url: "/Logo-Cilacap.png", sizes: "32x32", type: "image/png" },
      { url: "/Logo-Cilacap.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/Logo-Cilacap.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Desa Sidaurip",
    title: "Desa Sidaurip | Portal Resmi Desa",
    description:
      "Pusat informasi digital dan layanan terpadu satu pintu untuk seluruh warga Desa Sidaurip.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desa Sidaurip | Portal Resmi Desa",
    description:
      "Pusat informasi digital dan layanan terpadu satu pintu untuk seluruh warga Desa Sidaurip.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#191c1d" },
  ],
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
  