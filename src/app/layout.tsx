import { Providers } from "@/components/providers";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import GoogleAnalytics from "@/lib/analytics/GoogleAnalytics";
import PageTracking from "@/lib/analytics/PageTracking";
import { Suspense } from "react";

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
export const metadata = {
  title: "Color Palette",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable}  p-0 m-0`}
      >
        <GoogleAnalytics />
        <Suspense>
          <PageTracking />
        </Suspense>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
