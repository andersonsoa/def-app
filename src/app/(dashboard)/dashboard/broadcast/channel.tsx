"use client";

import { useStore } from "@/app/(dashboard)/dashboard/broadcast/store";
import { useCallback, useEffect, useRef, useState } from "react";

type EventData = {
  type: "update-value" | "window-move";
  value: any;
};

export function Channel() {
  const bcRef = useRef<BroadcastChannel>();
  const intervalRef = useRef<any>();
  const [direction, setDirection] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [value, setValue] = useStore();

  function handler() {
    const newValue = !value;
    setValue(newValue);
    bcRef.current?.postMessage({ type: "update-value", value: newValue });
  }

  useEffect(() => {
    bcRef.current = new BroadcastChannel("test-channel");

    const onMessage = (event: MessageEvent<EventData>) => {
      if (event.data.type === "update-value") {
        setValue(() => event.data.value);
      }

      if (event.data.type === "window-move") {
        const otherPos = event.data.value;
        const myPos = { x: window.screenTop, y: window.screenLeft };
        console.log({
          otherPos,
          myPos,
        });
        if (otherPos.x > myPos.x) {
          setDirection((c) => ({
            ...c,
            right: true,
            left: false,
          }));
        }
        if (otherPos.x < myPos.x) {
          setDirection((c) => ({
            ...c,
            left: true,
            right: false,
          }));
        }
        if (otherPos.y > myPos.y) {
          setDirection((c) => ({
            ...c,
            top: false,
            bottom: true,
          }));
        }
        if (otherPos.y < myPos.y) {
          setDirection((c) => ({
            ...c,
            top: true,
            bottom: false,
          }));
        }
      }
    };

    const createWindowHandler = () => {
      let x = 0;
      let y = 0;

      return () => {
        const currentX = window.screenLeft;
        const currentY = window.screenTop;

        if (currentX !== x || currentY !== y) {
          x = currentX;
          y = currentY;

          bcRef.current?.postMessage({
            type: "window-move",
            value: { x, y },
          });
        }
      };
    };
    intervalRef.current = setInterval(createWindowHandler(), 500);

    bcRef.current.addEventListener("message", onMessage);

    return () => {
      clearTimeout(intervalRef.current);
      bcRef.current?.removeEventListener("message", onMessage);
      bcRef.current?.close();
    };
  }, [setValue]);

  return (
    <div
      className={`grid place-items-center w-full border-8 
      ${direction.top ? "border-t-emerald-400" : "border-t-transparent"}
      ${direction.left ? "border-l-emerald-400" : "border-l-transparent"}
      ${direction.bottom ? "border-b-emerald-400" : "border-b-transparent"}
      ${direction.right ? "border-r-emerald-400" : "border-r-transparent"}
      `}
    >
      <button
        className={`w-10 h-10 ${value ? "bg-emerald-400" : "bg-zinc-400"}`}
        onClick={handler}
      />
    </div>
  );
}
