"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import Link from "next/link";

const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  body: z.string().min(5, "Body must be at least 5 characters"),
});

type FormData = z.infer<typeof schema>;

async function fetchPosts() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10",
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

async function createPost(newPost: { title: string; body: string }) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });
  if (!res.ok) throw new Error("Failed to create");
  return res.json();
}

export default function CreatePostPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData(["posts"], (oldPosts: any) => {
        const uniquePost = { ...newPost, id: Date.now() }; // ensure unique id
        return oldPosts ? [...oldPosts, uniquePost] : [uniquePost];
      });
    },
  });

  function onSubmit(data: FormData) {
    mutation.mutate(data);
  }

  const inputClass =
    "m-2 rounded-md border border-input bg-background p-2 text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none";

  return (
    <div className="flex flex-col p-4 text-foreground">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row flex-wrap">
        <div className="flex flex-col">
          <input
            type="text"
            className={inputClass}
            placeholder="Title"
            {...register("title")}
          />
          {errors.title && (
            <p className="m-2 text-destructive">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            className={inputClass}
            placeholder="Body"
            {...register("body")}
          />
          {errors.body && (
            <p className="m-2 text-destructive">{errors.body.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <button
            type="submit"
            className="m-2 rounded-md bg-primary p-2 text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating..." : "Create Post"}
          </button>
          {mutation.isError && (
            <p className="m-2 text-destructive">
              Error: {mutation.error.message}
            </p>
          )}
          {mutation.isSuccess && (
            <p className="m-2 text-green-600 dark:text-green-400">
              Post created!
            </p>
          )}
        </div>
      </form>

      <div className="mt-6">
        <h2 className="mb-2 text-xl font-bold">Posts</h2>
        {isLoading && <p className="text-muted-foreground">Loading posts...</p>}
        {isError && <p className="text-destructive">Error: {error.message}</p>}
        <ul>
          {posts?.map((post: { id: number; title: string }) => (
            <li key={post.id} className="border-b border-border p-2">
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
    </div>
  );
}
