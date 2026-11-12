"use client";

import { useSyncExternalStore } from "react";
import { MENU_ITEMS, type MenuItem } from "./menu-items";

/** A section counts as current once its top passes this line, just under the header. */
const ACTIVE_LINE_PX = 120;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  window.addEventListener("hashchange", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
    window.removeEventListener("hashchange", onChange);
  };
}

function readActiveKey(): MenuItem["key"] {
  let active: MenuItem["key"] = MENU_ITEMS[0].key;
  for (const item of MENU_ITEMS) {
    const section = document.getElementById(item.hash.slice(1));
    if (section && section.getBoundingClientRect().top <= ACTIVE_LINE_PX)
      active = item.key;
  }
  return active;
}

/** Menu key of the section under the header; shared by the inline menu and the mobile dropdown. */
export function useActiveMenuKey(): MenuItem["key"] {
  return useSyncExternalStore(
    subscribeToScroll,
    readActiveKey,
    () => MENU_ITEMS[0].key,
  );
}
