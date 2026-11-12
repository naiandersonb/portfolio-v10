import { expect, test } from "@playwright/test";

test.describe("about, services, experience and education (US4)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pt-BR");
  });

  test("about shows bio, stack and profile links", async ({ page }) => {
    const about = page.getByRole("region", { name: /Interfaces que escalam/ });
    await expect(about).toContainText("Transformo regras de negócio complexas");
    await expect(about).toContainText("TanStack Query");

    const github = about.getByRole("link", { name: "GitHub: naiandersonb" });
    await expect(github).toHaveAttribute("target", "_blank");
    await expect(github).toHaveAttribute("rel", "noopener noreferrer");
    await expect(about.getByRole("link", { name: /E-mail:/ })).toHaveAttribute("href", /^mailto:/);
  });

  test("services list the three areas", async ({ page }) => {
    const services = page.getByRole("region", { name: /Da ideia ao deploy/ });
    await expect(services.getByRole("heading", { level: 3 })).toHaveCount(3);
  });

  test("experience runs newest first with numbered deliverables", async ({ page }) => {
    const experience = page.getByRole("region", { name: /Onde já construí/ });
    await expect(experience.getByRole("heading", { level: 3 })).toHaveText(["AcheiConsulta", "TheMembers"]);
    await expect(experience).toContainText("ago 2024 — presente");
    await expect(experience.getByRole("list", { name: "Entregas na TheMembers" }).getByRole("listitem")).toHaveCount(4);
    await expect(experience.getByRole("link")).toHaveCount(0);
  });

  test("education runs newest first", async ({ page }) => {
    const years = await page
      .getByRole("region", { name: "Estudo contínuo" })
      .getByRole("listitem")
      .evaluateAll((items) => items.map((item) => Number(item.textContent?.match(/(\d{4})\s*$/)?.[1])));
    expect(years).toEqual([...years].sort((a, b) => b - a));
  });

  test("English uses the English copy", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { name: "Where I’ve built" })).toBeVisible();
    await expect(page.getByText("Aug 2024 — present")).toBeVisible();
    await expect(page.getByText("Partner & Developer")).toBeVisible();
  });
});
