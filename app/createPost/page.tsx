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

  return (
    <div className="flex flex-col p-4">
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row">
        <div className="flex flex-col">
          <input
            type="text"
            className="border border-gray-300 p-2 m-2"
            placeholder="Title"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            className="border border-gray-300 p-2 m-2"
            placeholder="Body"
            {...register("body")}
          />
          {errors.body && <p className="text-red-500">{errors.body.message}</p>}
        </div>
        <div className="flex flex-col">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 m-2"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating..." : "Create Post"}
          </button>
          {mutation.isError && (
            <p className="text-red-500">Error: {mutation.error.message}</p>
          )}
          {mutation.isSuccess && (
            <p className="text-green-500">Post created!</p>
          )}
        </div>
      </form>

      {/* Posts List */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Posts</h2>
        {isLoading && <p>Loading posts...</p>}
        {isError && <p className="text-red-500">Error: {error.message}</p>}
        <ul>
          {posts?.map((post: any) => (
            <li key={post.id} className="border-b p-2">
              <Link href={`/blog/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
