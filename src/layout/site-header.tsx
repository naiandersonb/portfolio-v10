import { CommandMenu } from "./command-menu";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { TerminalButton } from "./terminal-button";

export function SiteHeader() {
  return (
    <div className="mx-auto w-full max-w-page px-6 pt-2 lg:px-12">
      <header className="relative flex min-h-20 items-center justify-between gap-4 border-b border-line">
        <Logo />

        <div className="flex items-center gap-2 sm:gap-4">
          <CommandMenu />
          <LanguageSwitcher />
          <TerminalButton />
          <MobileMenu />
        </div>
      </header>
    </div>
  );
}
