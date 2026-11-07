"use client";
import type { ImageLoaderProps } from "next/image";

// Unsplash provides responsive crops directly; avoid proxying the same image twice.
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality || 80));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  return url.toString();
}
