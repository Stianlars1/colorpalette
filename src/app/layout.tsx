import { Providers } from "@/components/providers";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});
export const metadata = {};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="apple-mobile-web-app-title" content="colorpalette" />
      </Head>
      <body
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable}  p-0 m-0`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
