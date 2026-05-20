"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const navLinkClass =
  "flex h-10 w-22 items-center justify-center rounded-lg bg-primary p-1 text-sm text-primary-foreground transition-colors hover:bg-primary/90";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading")
    return <p className="p-4 text-muted-foreground">Loading...</p>;

  return (
    <nav className="sticky top-0 z-50 flex h-15 items-center justify-between border-b border-border bg-background px-4">
      <Link href="/" className="size-10 text-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-full w-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
          />
        </svg>
      </Link>
      <div className="flex gap-5">
        <Link href="/" className={navLinkClass}>
          Home
        </Link>
        <Link href="/blog" className={navLinkClass}>
          blog
        </Link>
        <Link href="/counter" className={navLinkClass}>
          counter
        </Link>
        <Link href="/createPost" className={navLinkClass}>
          create Post
        </Link>
      </div>
      <div className="flex flex-row gap-5">
        <div>
          {session ? (
            <div className="flex flex-row items-center justify-center gap-5">
              <Button className="h-10 w-20" onClick={() => signOut()}>
                Logout
              </Button>
              <div className="flex flex-col">
                <p className="text-foreground">{session.user?.name}</p>
                <p className="text-muted-foreground">{session.user?.email}</p>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => router.push("/authPage")}
              className="h-10 w-20 text-sm"
            >
              Login
            </Button>
          )}
        </div>
        <DarkModeToggle />
      </div>
    </nav>
  );
}
