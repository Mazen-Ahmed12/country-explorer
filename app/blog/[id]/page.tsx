"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Loader from "@/app/loading";

async function fetchPost(id: string) {
  if (!id) throw new Error("No ID provided");
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const {
    data: post,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
    enabled: !!id,
  });

  const btnClass =
    "rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90";

  if (isLoading)
    return <Loader/>
  if (isError)
    return <h1 className="text-destructive">Error: {error.message}</h1>;

  return (
    <article className="text-foreground">
      <h1 className="p-5 text-2xl font-bold">title : {post.title}</h1>
      <p className="p-5 text-muted-foreground">post : {post.body}</p>
      <div className="flex flex-col items-center justify-center gap-y-6">
        <button className={btnClass} onClick={() => router.push(`/fetchloop/${id}`)}>
          user&apos;s data page
        </button>
        <button className={btnClass} onClick={() => router.push(`/createPost`)}>
          Create Post
        </button>
        <button className={btnClass} onClick={() => router.back()}>
          ← Back
        </button>
      </div>
    </article>
  );
}
