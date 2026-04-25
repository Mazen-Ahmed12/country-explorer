"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") return <p>Loading...</p>;
  return (
    <nav className="flex items-center justify-between h-15 px-4 sticky top-0 z-50 bg-white dark:bg-black border-b border-y-2 ">
      <Link href="/" className="size-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-full h-full flex items-start justify-start text-blue-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
          />
        </svg>
      </Link>
      <div className="flex gap-5">
        <Link
          href="/"
          className="flex items-center justify-center w-22 h-10 rounded-lg text-white bg-black dark:text-black dark:bg-white p-1 text-sm"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="flex items-center justify-center w-22 h-10 rounded-lg text-white bg-black dark:text-black dark:bg-white p-1 text-sm"
        >
          about
        </Link>
        <Link
          href="/blog"
          className="flex items-center justify-center w-22 h-10 rounded-lg text-white bg-black dark:text-black dark:bg-white p-1 text-sm"
        >
          blog
        </Link>
        <Link
          href="/counter"
          className="flex items-center justify-center w-22 h-10 rounded-lg text-white bg-black dark:text-black dark:bg-white p-1 text-sm"
        >
          counter
        </Link>
        <Link
          href="/createPost"
          className="flex items-center justify-center w-22 h-10 rounded-lg text-white bg-black dark:text-black dark:bg-white p-1 text-sm"
        >
          create Post
        </Link>
        <Link
          href="/test"
          className="flex items-center justify-center w-22 h-10 rounded-lg text-white bg-black dark:text-black dark:bg-white p-1 text-sm"
        >
          test
        </Link>
      </div>
      <div className="flex flex-row gap-5">
        <div>
          {session ? (
            <div className="flex flex-row items-center justify-center gap-5">
              <Button className="w-20 h-10 " onClick={() => signOut()}>
                Logout
              </Button>
              <div className="flex flex-col">
                <p className="text-black dark:text-white">
                  {session.user?.name}
                </p>
                <p className="text-black dark:text-white">
                  {session.user?.email}
                </p>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => router.push("/authPage")}
              className="w-20 h-10 text-white dark:text-black p-1 text-sm"
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
