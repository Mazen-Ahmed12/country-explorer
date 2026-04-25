import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <p className="text-xl text-gray-600">Page not found</p>
      <Button>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}