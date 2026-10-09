"use client";

import { useSyncExternalStore } from "react";
import { bnDate } from "@/lib/bn";

const subscribe = () => () => {};

export default function BnDate({ className }: { className?: string }) {
  const date = useSyncExternalStore(
    subscribe,
    () => bnDate(),
    () => ""
  );

  return <span className={className}>{date || "\u00A0"}</span>;
}