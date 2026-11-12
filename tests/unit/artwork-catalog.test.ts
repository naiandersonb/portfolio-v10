import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { GLYPH_PATHS, LOGO } from "@/artwork/catalog";
import tokens from "../../design/tokens.json";

const GLYPHS_DIR = join(__dirname, "../../design/artwork/glyphs");

const paletteHexes = new Set(
  Object.values(tokens.color)
    .map((token) => token.value.toUpperCase())
    .filter((value) => value.startsWith("#")),
);

describe("artwork catalog", () => {
  it("has exactly the glyphs exported from the prototype, with the same paths", () => {
    const exported = readdirSync(GLYPHS_DIR)
      .filter((file) => file.endsWith(".svg"))
      .map((file) => {
        const svg = readFileSync(join(GLYPHS_DIR, file), "utf8");
        return [file.replace(/\.svg$/, ""), svg.match(/<path d="([^"]+)"/)?.[1]] as const;
      });

    expect(Object.fromEntries(exported)).toEqual(GLYPH_PATHS);
  });

  it("draws the logo only with palette colors", () => {
    const logoColors = [LOGO.square.fill, LOGO.bolt.fill, LOGO.gouges.stroke];

    for (const color of logoColors) {
      expect(paletteHexes).toContain(color.toUpperCase());
    }
  });
});
