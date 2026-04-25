"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
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
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col">
      <button
        onClick={() => refetch()}
        disabled={isRefetching}
        className={`flex items-center justify-center px-4 py-2 cursor-${isRefetching ? 'not-allowed' : 'pointer'}`}
      >
        {isRefetching ? "Refreshing..." : "Refetch Posts"}
      </button>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="py-3">
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
