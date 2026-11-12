"use client";

/**
 * Based on the KokonutUI use-copy-to-clipboard hook (https://kokonutui.com).
 * Adapted for this portfolio: a failed copy is a state the UI shows (FR-016) instead of a
 * console.error, the reset timer is cleared on unmount, and `copyText` is exported so the
 * terminal's `email` command copies through the same function.
 */

import { useEffect, useRef, useState } from "react";

export type CopyStatus = "idle" | "copied" | "failed";

/** Writes `value` to the clipboard; rejects when the API is missing or permission is denied. */
export async function copyText(value: string): Promise<void> {
  if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
  await navigator.clipboard.writeText(value);
}

export function useCopyToClipboard({ timeout = 2000 }: { timeout?: number } = {}) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const copyToClipboard = async (value: string) => {
    clearTimeout(resetTimer.current);
    try {
      await copyText(value);
      setStatus("copied");
      resetTimer.current = setTimeout(() => setStatus("idle"), timeout);
    } catch {
      // The caller keeps the value visible and selectable, so a failed copy only needs saying.
      setStatus("failed");
    }
  };

  return { status, copyToClipboard };
}
