import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Joins conditional class names and lets later Tailwind utilities override earlier ones (shadcn `cn`). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
