"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

async function fetchPosts() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10",
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default function BlogPage() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading)
    return <div className="text-muted-foreground">Loading...</div>;
  if (isError)
    return <div className="text-destructive">Error: {error.message}</div>;

  return (
    <div className="flex flex-col text-foreground">
      <button
        onClick={() => refetch()}
        disabled={isRefetching}
        className="mb-4 flex w-fit items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isRefetching ? "Refreshing..." : "Refetch Posts"}
      </button>
      <ul>
        {posts.map((post: { id: number; title: string }) => (
          <li key={post.id} className="border-b border-border py-3">
            <Link
              href={`/blog/${post.id}`}
              className="text-foreground hover:text-primary"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
