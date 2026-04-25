"use client"

import { useQuery } from "@tanstack/react-query";
import { use } from "react";

// Mock API functions
const fetchUserById = async (id: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) throw new Error("User not found");
  return res.json();
};

const fetchPostsByUserId = async (userId: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  return res.json(); // Returns array of posts
};

export default function FetchLoopPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Fetch the user first
  const {id} = use(params);

  const { 
      data: user, 
      isLoading: isUserLoading 
    } = useQuery({
        queryKey: ["user", id],
        queryFn: () => fetchUserById(id),
        enabled: !!id,
    });
    
    // 2. Fetch posts ONLY after we have the user.id
    const { 
        data: posts, 
        isLoading: isPostsLoading 
      } = useQuery({
          queryKey: ["posts", user?.id], // This key updates once user is found
          queryFn: () => fetchPostsByUserId(user!.id),
          // ENABLED is the key here:
          // !!user converts the object to 'true'. If user is undefined, it's 'false'.
          enabled: !!user?.id, 
      });

  if (isUserLoading) return <p>Finding user...</p>;

  return (
    <div>
      <h1>{user?.name}'s Profile</h1>
      <hr />
      
      <h3>Posts:</h3>
      {isPostsLoading ? (
        <p>Loading posts...</p>
      ) : (
        <ul>
          {posts?.map((post: { id: number; title: string }) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}