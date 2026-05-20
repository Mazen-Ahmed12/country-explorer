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
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <SessionProvider>
          <ThemeProvider>
            <Navbar />
            <main className="mx-auto max-w-6xl px-4 py-8">
              <Provider>{children}</Provider>
            </main>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
