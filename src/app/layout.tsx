import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "QuranLens Review — Platform Ulasan Buku Pendidikan Agama Islam",
  description: "Platform ulasan dan rekomendasi buku-buku Pendidikan Agama Islam. Temukan sudut pandang baru melalui telaah mendalam dan rekomendasi buku PAI terpilih.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${geist.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
