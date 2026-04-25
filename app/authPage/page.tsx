"use client"
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

export default function AuthButtons() {
  return (
    <div className="flex flex-col gap-4">
      {/*<Button onClick={() => signIn("github")}>Login with GitHub</Button>
      <Button onClick={() => signIn("google")}>Login with Google</Button>*/}
      <Button
        onClick={() =>
          signIn("credentials", {
            email: "test@test.com",
            password: "test123",
            redirectTo: "/",
          })
        }
      >
        Login with Email
      </Button>
      <Button onClick={() => signOut({ redirectTo: "/" })}>Sign Out</Button>
    </div>
  );
}
