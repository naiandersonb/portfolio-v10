"use client";

/**
 * Small-screen section menu, modelled on the KokonutUI Account Menu
 * (https://kokonutui.com/docs/navigation/profile-dropdown): a panel that grows out of
 * the trigger's corner, an identity header, icon rows, arrow-key navigation and Escape
 * returning focus. Account switching, theme, status and hold-to-sign-out are left out.
 */

import { Glyph } from "@/artwork/glyph";
import { LogoMark } from "@/artwork/logo-mark";
import { cn } from "@/components/class-names";
import { profile } from "@/content/profile";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { MENU_ITEMS } from "./menu-items";
import { useActiveMenuKey } from "./use-active-section";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

function menuItems(menu: HTMLElement | null): HTMLElement[] {
  return menu
    ? Array.from(menu.querySelectorAll<HTMLElement>('[role="menuitem"]'))
    : [];
}

/** Where arrow, Home and End keys move focus inside the menu (WAI-ARIA menu button pattern). */
function nextItem(items: HTMLElement[], key: string): HTMLElement | undefined {
  const index = items.findIndex((item) => item === document.activeElement);
  if (key === "Home") return items[0];
  if (key === "End") return items.at(-1);
  if (key === "ArrowDown") return items[(index + 1) % items.length];
  if (key === "ArrowUp")
    return items[(index - 1 + items.length) % items.length];
  return undefined;
}

export function MobileMenu() {
  const t = useTranslations("menu");
  const tHeader = useTranslations("header");
  const tFooter = useTranslations("footer");
  const activeKey = useActiveMenuKey();
  const reducedMotion = useReducedMotion() === true;
  const menuId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const close = (returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!open) return;
    const firstItem = menuItems(menuRef.current)[0];
    firstItem?.focus({ preventScroll: true });

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () =>
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [open]);

  function handleMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
      return;
    }
    if (event.key === "Tab") {
      close(false);
      return;
    }
    const target = nextItem(menuItems(menuRef.current), event.key);
    if (target) {
      event.preventDefault();
      target.focus();
    }
  }

  return (
    <nav
      ref={wrapperRef}
      aria-label={tHeader("menuLabel")}
      className="relative lg:hidden"
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={open ? tHeader("closeMenu") : tHeader("menuButton")}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-button border transition-colors",
          open
            ? "border-white text-white"
            : "border-line-strong text-white hover:border-white",
        )}
      >
        <span aria-hidden="true" className="flex w-4 flex-col gap-1">
          <span
            className={cn(
              "h-px bg-current transition-transform duration-200 motion-reduce:transition-none",
              open && "translate-y-[2.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-px bg-current transition-transform duration-200 motion-reduce:transition-none",
              open && "-translate-y-[2.5px] -rotate-45",
            )}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-label={tHeader("menuLabel")}
            onKeyDown={handleMenuKeyDown}
            initial={{ opacity: 0, scale: 0.94, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -2 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.18, ease: EASE_OUT }
            }
            style={{ transformOrigin: "top right" }}
            className="absolute top-[calc(100%+8px)] right-0 z-30 w-[min(272px,calc(100vw-48px))] rounded-[16px] border border-line-strong bg-card p-1.5 shadow-[0_16px_48px_rgb(0_0_0/0.45)]"
          >
            <div className="flex items-center gap-3 px-2.5 pt-2 pb-3">
              <LogoMark size={36} />
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium text-white">
                  {profile.name}
                </span>
                <span className="truncate text-xs text-muted">
                  {tFooter("role")}
                </span>
              </span>
            </div>
            <hr className="mx-2.5 mb-1.5 h-px border-0 bg-line" />

            {MENU_ITEMS.map((item) => {
              const active = item.key === activeKey;
              return (
                <a
                  key={item.key}
                  href={item.hash}
                  role="menuitem"
                  tabIndex={-1}
                  aria-current={active ? "location" : undefined}
                  onClick={() => close(false)}
                  className={cn(
                    "flex min-h-11 w-full items-center gap-3 rounded-[10px] px-2.5 font-mono text-[13px] tracking-[0.12em] uppercase outline-none transition-colors duration-100",
                    "focus-visible:bg-white/5 hover:bg-white/5",
                    active ? "text-lavender" : "text-white",
                  )}
                >
                  <Glyph
                    id={item.glyph}
                    size={18}
                    decorative
                    className={active ? "text-lavender" : "text-muted"}
                  />
                  <span className="flex-1">{t(item.key)}</span>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="size-1.5 bg-lavender"
                    />
                  )}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
