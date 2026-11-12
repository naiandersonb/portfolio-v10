import { expect, test } from "@playwright/test";

const EMAIL = "naiandersonb.dev@gmail.com";

test.describe("contact (US5)", () => {
  test("copies the e-mail and says so when the clipboard is allowed", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/pt-BR#contact");

    await page.getByRole("button", { name: "Copiar e-mail" }).click();
    await expect(page.getByRole("status").filter({ hasText: "✓ email copiado" })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(EMAIL);
  });

  test("keeps the e-mail visible and explains when copying fails", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        value: { writeText: () => Promise.reject(new DOMException("denied", "NotAllowedError")) },
      });
    });
    await page.goto("/pt-BR#contact");

    await page.getByRole("button", { name: "Copiar e-mail" }).click();
    const contact = page.getByRole("region", { name: /Vamos construir/ });
    await expect(contact.getByRole("status")).toContainText("não foi possível copiar");
    await expect(contact.getByText(EMAIL, { exact: true })).toBeVisible();
  });

  test("the terminal email command uses the same copy", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/en");
    await page.getByRole("button", { name: "Open terminal" }).click();
    const input = page.getByRole("dialog", { name: "Terminal" }).getByRole("textbox");
    await input.fill("email");
    await input.press("Enter");

    await expect(page.getByRole("dialog")).toContainText(`✓ email copied: ${EMAIL}`);
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(EMAIL);
  });

  test("profile links open in a new tab", async ({ page }) => {
    await page.goto("/en");
    const links = page.getByRole("list", { name: "Profiles" }).last().getByRole("link");
    await expect(links).toHaveCount(2);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
    await expect(page.getByRole("link", { name: /LinkedIn: naianderson-bruno/ }).last()).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/naianderson-bruno",
    );
  });
});
