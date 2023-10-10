"use client";

import { FormEvent, Suspense, useRef, useState } from "react";
import { User } from "./User";

interface Props {
  defaultCount?: number;
}

export function Users(props: Props) {
  const [count, setCount] = useState([{ id: 1 }]);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSearch(e: FormEvent) {
    e.preventDefault();

    const value = inputRef.current?.value;
    if (value) {
      const users = Array.from({ length: +value }).map((_, idx) => ({
        id: idx + 1,
      }));
      setCount(users);
    }
  }

  return (
    <div className="">
      <form
        className="mb-4 p-2 rounded border border-zinc-200 flex"
        onSubmit={handleSearch}
      >
        <input
          type="number"
          ref={inputRef}
          className="px-2 border border-zinc-300 w-full outline-none"
        />
        <button className="bg-zinc-700 text-zinc-100 px-2">Go!</button>
      </form>
      <div className="grid grid-cols-3 gap-2 w-[800px]">
        {count.map(({ id }) => (
          <Suspense fallback={<UserLoader />} key={id}>
            <User userId={id} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}

export function UserLoader() {
  return (
    <div className="border border-zinc-200 rounded p-4 h-24 grid gap-2">
      <div className="h-6 bg-zinc-200 animate-pulse w-full"></div>
      <span className="h-4 bg-zinc-200 animate-pulse w-full"></span>
    </div>
  );
}
