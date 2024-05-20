import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Steps from "@/components/Steps";

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
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      <Header/>
      <Hero/>
      <Steps/>
      <Footer/>
      {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
