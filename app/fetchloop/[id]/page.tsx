"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchUserById = async (id: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) throw new Error("User not found");
  return res.json();
};

const fetchPostsByUserId = async (userId: number) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
  );
  return res.json();
};

export default function FetchLoopPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });

  const { data: posts, isLoading: isPostsLoading } = useQuery({
    queryKey: ["posts", user?.id],
    queryFn: () => fetchPostsByUserId(user!.id),
    enabled: !!user?.id,
  });

  if (isUserLoading)
    return <p className="text-muted-foreground">Finding user...</p>;

  return (
    <div className="text-foreground">
      <h1 className="text-2xl font-bold">{user?.name}&apos;s Profile</h1>
      <hr className="my-4 border-border" />

      <h3 className="mb-2 font-semibold">Posts:</h3>
      {isPostsLoading ? (
        <p className="text-muted-foreground">Loading posts...</p>
      ) : (
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          {posts?.map((post: { id: number; title: string }) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
