import { expect, test } from "@playwright/test";

const DETECTION = [
  { browserLocale: "pt-BR", expected: "/pt-BR" },
  { browserLocale: "pt-PT", expected: "/pt-BR" },
  { browserLocale: "pt", expected: "/pt-BR" },
  { browserLocale: "de-DE", expected: "/en" },
  { browserLocale: "en-US", expected: "/en" },
];

// The browser derives Accept-Language from its locale and overrides an explicit header, so set the locale.
for (const { browserLocale, expected } of DETECTION) {
  test(`a ${browserLocale} browser lands on ${expected}`, async ({ browser }) => {
    const context = await browser.newContext({ locale: browserLocale });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(new RegExp(`${expected}$`));
    await context.close();
  });
}

test("the switcher keeps the section and remembers the choice", async ({ page, context }) => {
  await page.goto("/pt-BR#contact");
  // The hash joins the link once hydrated; before that the switch is a plain link to the other locale's page.
  await page.waitForLoadState("networkidle");
  const switcher = page.getByRole("list", { name: "Idioma" });
  await expect(switcher.getByRole("link", { name: "PT" })).toHaveAttribute("aria-current", "true");

  await switcher.getByRole("link", { name: "EN" }).click();
  await expect(page).toHaveURL(/\/en#contact$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  const cookies = await context.cookies();
  expect(cookies.find((cookie) => cookie.name === "NEXT_LOCALE")?.value).toBe("en");
});

test("lang en in the terminal switches the locale", async ({ page }) => {
  await page.goto("/pt-BR");
  await page.getByRole("button", { name: "Abrir terminal" }).click();
  const input = page.getByRole("dialog", { name: "Terminal" }).getByRole("textbox");
  await input.fill("lang en");
  await input.press("Enter");

  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});
