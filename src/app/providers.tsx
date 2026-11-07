"use client";
import { type ReactNode } from "react";
// Native scrolling preserves standard anchors and keyboard navigation.
export default function Providers({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
