import { expect, type Page, test } from "@playwright/test";

const terminal = (page: Page) => page.getByRole("dialog", { name: "Terminal" });
const terminalInput = (page: Page) => terminal(page).getByRole("textbox");

async function runInTerminal(page: Page, command: string) {
  await terminalInput(page).fill(command);
  await terminalInput(page).press("Enter");
}

test.describe("terminal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pt-BR");
    // Shortcuts listen only after hydration; a key pressed earlier is lost.
    await page.waitForLoadState("networkidle");
  });

  test("opens from the header button and closes with Escape, returning focus", async ({ page }) => {
    const button = page.getByRole("button", { name: "Abrir terminal" });
    await button.click();
    await expect(terminal(page)).toBeVisible();
    await expect(terminalInput(page)).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(terminal(page)).toBeHidden();
    await expect(button).toBeFocused();
  });

  test("opens with Ctrl+K and with /", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard shortcuts are a desktop affordance");
    await page.locator("body").press("Control+k");
    await expect(terminal(page)).toBeVisible();
    await page.keyboard.press("Escape");

    await page.locator("body").press("/");
    await expect(terminal(page)).toBeVisible();
  });

  test("shortcuts do not fire while typing", async ({ page }) => {
    await page.getByRole("button", { name: "Abrir terminal" }).click();
    await terminalInput(page).pressSequentially("g c /");

    await expect(terminalInput(page)).toHaveValue("g c /");
    await expect(page).toHaveURL(/\/pt-BR$/);
  });

  test("on a phone it fills the viewport, keeps the input visible and shows a close button", async ({ page, isMobile }) => {
    test.skip(!isMobile, "edge case: terminal on a phone");
    await page.getByRole("button", { name: "Abrir terminal" }).click();

    const box = await terminal(page).boundingBox();
    const viewport = page.viewportSize();
    expect(box?.width).toBe(viewport?.width);
    expect(box?.height).toBeCloseTo(viewport?.height ?? 0, 0);

    const inputBox = await terminalInput(page).boundingBox();
    const visualHeight = await page.evaluate(() => window.visualViewport?.height ?? window.innerHeight);
    expect((inputBox?.y ?? 0) + (inputBox?.height ?? 0)).toBeLessThanOrEqual(visualHeight);
    await expect(terminal(page).getByRole("button", { name: "Fechar terminal" })).toBeInViewport();
  });

  test("help lists visible commands and hints at hidden ones", async ({ page }) => {
    await page.getByRole("button", { name: "Abrir terminal" }).click();
    await runInTerminal(page, "help");

    const output = terminal(page).locator("[aria-live]");
    await expect(output).toContainText("contact");
    await expect(output).toContainText("psst… existem comandos secretos.");
    await expect(output).not.toContainText("neofetch");
  });

  test("an unknown command keeps the terminal open", async ({ page }) => {
    await page.getByRole("button", { name: "Abrir terminal" }).click();
    await runInTerminal(page, "projects");

    await expect(terminal(page).locator("[aria-live]")).toContainText("comando não encontrado: projects");
    await expect(terminal(page)).toBeVisible();
  });

  test("Tab completes and ↑ recalls history", async ({ page }) => {
    await page.getByRole("button", { name: "Abrir terminal" }).click();
    await terminalInput(page).fill("he");
    await terminalInput(page).press("Tab");
    await expect(terminalInput(page)).toHaveValue("help ");

    await terminalInput(page).press("Enter");
    await terminalInput(page).press("ArrowUp");
    await expect(terminalInput(page)).toHaveValue("help");
  });

  test("a navigation command closes the terminal and goes to the section", async ({ page }) => {
    await page.getByRole("button", { name: "Abrir terminal" }).click();
    await runInTerminal(page, "contato");

    await expect(terminal(page)).toBeHidden();
    await expect(page).toHaveURL(/\/pt-BR#contact$/);
  });

  test("g c jumps to the contact section", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard shortcuts are a desktop affordance");
    await page.locator("body").press("g");
    await page.locator("body").press("c");
    await expect(page).toHaveURL(/#contact$/);
  });
});

test.describe("menu", () => {
  test("works from the keyboard alone with a visible focus ring", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard navigation is checked on desktop");
    await page.goto("/pt-BR");
    await page.keyboard.press("Tab");

    const logo = page.getByRole("link", { name: "Naianderson Bruno, início" });
    await expect(logo).toBeFocused();
    await expect(logo).toHaveCSS("outline-style", "solid");

    await page.keyboard.press("Tab");
    await expect(page.getByRole("navigation", { name: "Seções" }).getByRole("link", { name: "Início" })).toBeFocused();
  });

  test("every terminal destination is reachable from the menu (SC-011)", async ({ page, isMobile }) => {
    await page.goto("/pt-BR");
    await page.waitForLoadState("networkidle");
    if (isMobile) await page.getByRole("button", { name: "Menu" }).click();

    const menu = page.getByRole("navigation", { name: "Seções" }).filter({ visible: true });
    for (const [name, hash] of [
      ["Início", "#top"],
      ["Sobre", "#about"],
      ["Contato", "#contact"],
    ]) {
      await expect(menu.getByRole(isMobile ? "menuitem" : "link", { name, exact: true })).toHaveAttribute("href", hash);
    }
  });

  test("marks the current section", async ({ page, isMobile }) => {
    test.skip(isMobile, "the inline menu shows from lg up");
    await page.goto("/pt-BR");
    const menu = page.getByRole("navigation", { name: "Seções" });
    await expect(menu.getByRole("link", { name: "Início" }).filter({ visible: true })).toHaveAttribute(
      "aria-current",
      "location",
    );
  });

  test("the mobile menu sits after the terminal button and opens as a dropdown", async ({ page, isMobile }) => {
    test.skip(!isMobile, "the dropdown is the small-screen menu");
    await page.goto("/pt-BR");
    await page.waitForLoadState("networkidle");

    const terminalButton = page.getByRole("button", { name: "Abrir terminal" });
    const toggle = page.getByRole("button", { name: "Menu" });
    const [terminalBox, toggleBox] = await Promise.all([terminalButton.boundingBox(), toggle.boundingBox()]);
    expect(toggleBox!.x).toBeGreaterThan(terminalBox!.x);

    await toggle.click();
    const menu = page.getByRole("menu", { name: "Seções" });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("menuitem", { name: "Início" })).toBeFocused();
    await expect(menu.getByRole("menuitem", { name: "Início" })).toHaveAttribute("aria-current", "location");

    await page.keyboard.press("ArrowDown");
    await expect(menu.getByRole("menuitem", { name: "Sobre" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();

    await page.getByRole("button", { name: "Menu" }).click();
    await page.getByRole("menuitem", { name: "Contato" }).click();
    await expect(page.getByRole("menu")).toBeHidden();
    await expect(page).toHaveURL(/#contact$/);
  });
});
