import type { GlyphId } from "@/artwork/catalog";

export type MenuItem = {
  /** Key under `menu` in the messages. */
  key: "home" | "about" | "contact";
  /** Section anchor on the home page. */
  hash: `#${string}`;
  glyph: GlyphId;
};

/** Single source for the menu and for the menu ⊇ terminal invariant (SC-011). */
export const MENU_ITEMS: readonly MenuItem[] = [
  { key: "home", hash: "#top", glyph: "home" },
  { key: "about", hash: "#about", glyph: "user" },
  { key: "contact", hash: "#contact", glyph: "mail" },
];
