"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { use } from "react";

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
  const router = useRouter()

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

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error: {error.message}</h1>;

  return (
    <article>
      <h1 className="p-5">title : {post.title}</h1>
      <p className="p-5">post : {post.body}</p>
      <div className="flex flex-col justify-center items-center gap-y-6">
        <button onClick={()=>router.push(`/fetchloop/${id}`)}> user's data page</button>
        <button onClick={()=>router.push(`/createPost`)}> Create Post</button>
        <button onClick={()=>router.back()}> ← Back</button>
      </div>
    </article>
  );
}
