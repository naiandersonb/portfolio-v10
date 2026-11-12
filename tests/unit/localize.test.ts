import { describe, expect, it } from "vitest";
import { pick } from "@/content/localize";

describe("pick", () => {
  it("returns the value of the requested locale", () => {
    expect(pick({ "pt-BR": "Sobre", en: "About" }, "pt-BR")).toBe("Sobre");
    expect(pick({ "pt-BR": "Sobre", en: "About" }, "en")).toBe("About");
  });

  it("falls back to the other locale when the requested one is empty", () => {
    expect(pick({ "pt-BR": "Sobre", en: "" }, "en")).toBe("Sobre");
    expect(pick({ "pt-BR": [], en: ["React"] }, "pt-BR")).toEqual(["React"]);
  });
});
