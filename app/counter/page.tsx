"use client";

import { useState } from "react";

export default function CounterPage() {
  const [count, setCount] = useState(0);

  const btnClass =
    "m-3 rounded-md bg-primary px-4 py-3 text-primary-foreground transition-colors hover:bg-primary/90";

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-foreground">
      <h1 className="text-2xl font-bold">Counter</h1>
      <p className="my-4 text-4xl font-semibold">{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)} className={btnClass}>
        +
      </button>
      <button
        onClick={() => setCount((prev) => (prev > 0 ? prev - 1 : 0))}
        className={btnClass}
      >
        -
      </button>
    </div>
  );
}
