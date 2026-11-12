import { expect, test } from "@playwright/test";

const LOCALES = [
  { path: "/pt-BR", name: "Naianderson Bruno", role: /Desenvolvedor/, cta: "Fale comigo", cv: "Baixar cv.pdf" },
  { path: "/en", name: "Naianderson Bruno", role: /Developer/, cta: "Let's talk", cv: "Download cv.pdf" },
];

for (const locale of LOCALES) {
  test.describe(`hero ${locale.path}`, () => {
    test("shows logo, name, role, prompt and CTAs without scrolling", async ({ page }) => {
      await page.goto(locale.path);

      const aboveTheFold = [
        page.getByRole("banner").getByRole("link").first(),
        page.getByRole("heading", { level: 1 }),
        page.getByText(locale.role).first(),
        page.getByText("~ $"),
        page.getByRole("link", { name: locale.cta }),
        page.getByRole("link", { name: locale.cv }),
      ];

      await expect(page.getByRole("heading", { level: 1 })).toHaveText(new RegExp(locale.name.replace(" ", "\\s*")));
      for (const element of aboveTheFold) {
        await expect(element).toBeInViewport();
      }
    });

    test("shows only real numbers, with no projects count", async ({ page }) => {
      await page.goto(locale.path);

      const stats = page.getByRole("main").locator("ul[aria-label] > li");
      await expect(stats).toHaveCount(2);
      await expect(page.getByText(/projetos|projects/i)).toHaveCount(0);
    });

    test("has no horizontal scroll", async ({ page }) => {
      await page.goto(locale.path);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  });
}

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("shows the full prompt command at once", async ({ page }) => {
    await page.goto("/en");

    await expect(page.locator("main p").first()).toContainText("whoami", { timeout: 500 });
  });
});
