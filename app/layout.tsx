import "./globals.css";
import Provider from "./provider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "./Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import { SessionProvider } from "next-auth/react";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <SessionProvider>
          <ThemeProvider>
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-8">
              <Provider>{children}</Provider>
            </main>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
