"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <p className="p-8 text-destructive">
      Something went wrong: {error.message}
    </p>
  );
}
