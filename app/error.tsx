"use client"; // error files must be client components

export default function Error({ error }: { error: Error }) {
  return <p>Something went wrong: {error.message}</p>;
}