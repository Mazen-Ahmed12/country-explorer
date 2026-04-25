"use client";

import { useState } from "react";

export default function BlogPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Counter</h1>
      <p>{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)} className="p-3 bg-blue-500 text-white m-3">
        +
      </button>
      <button
        onClick={() => setCount((prev) => (prev > 0 ? prev - 1 : 0))}
        className="p-3 bg-blue-500 text-white m-3"
      >
        -
      </button>
    </div>
  );
}
