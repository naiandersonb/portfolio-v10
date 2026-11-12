import { describe, expect, it } from "vitest";
import { withFallbackMessages } from "@/i18n/message-fallback";
import en from "@/messages/en.json";
import ptBR from "@/messages/pt-BR.json";

describe("withFallbackMessages", () => {
  it("keeps translated strings and fills missing or empty ones from the fallback", () => {
    const primary = { menu: { home: "Início", about: "" }, footer: { role: "Desenvolvedor" } };
    const fallback = { menu: { home: "Home", about: "About", contact: "Contact" }, footer: { role: "Developer" } };

    expect(withFallbackMessages(primary, fallback)).toEqual({
      menu: { home: "Início", about: "About", contact: "Contact" },
      footer: { role: "Desenvolvedor" },
    });
  });

  it("finds no gap between the two message files today", () => {
    expect(withFallbackMessages(ptBR, en)).toEqual(ptBR);
    expect(withFallbackMessages(en, ptBR)).toEqual(en);
  });
});
