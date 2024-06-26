import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

import Footer from "@/components/Footer";
import { parseCookies } from 'nookies';

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RWG",
  description: "A randomised CrossFit WOD generator",
  icons: {
    icon: '/dumbell.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
      
      <div className="bg-[#E9F7FF] sm:bg-[url('/fondo.png')] bg-no-repeat bg-cover">
        <Header/>
        {children}
        <Footer/>
      </div>
      
      
      </body>
    </html>
  );
}
