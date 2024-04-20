import { test, expect } from "@playwright/test";

import { type MenuOptionsType } from "./utils/types";

test("should access index page", async ({ page }) => {
  await page.goto("/");

  const title = page.locator("title");
  await expect(await title.textContent()).toBe("GetSongs");

  const pageMessage = page.locator(
    "header.v-toolbar div.v-toolbar__content h2"
  );
  await expect(pageMessage).toHaveText("Bem-vindo ao GetSongs!");
});

test("access pages by menu", async ({ page }) => {
  await page.goto("/");

  const menuOptions: MenuOptionsType = [
    {
      href: "/auth/login",
      pageMessage: "Bem-vindo de volta!",
    },
    {
      href: "/auth/register",
      pageMessage: "Junte-se a nós!",
    },
    {
      href: "/about",
      pageMessage: "Curioso sobre o projeto?",
    },
    {
      href: "/",
      pageMessage: "Bem-vindo ao GetSongs!",
    },
  ];

  for (const menuOption of menuOptions) {
    const link = page.locator(`a.v-list-item[href="${menuOption.href}"]`);
    await link.click();

    const pageMessageLocator = page.locator(
      "header.v-toolbar div.v-toolbar__content h2"
    );
    await expect(pageMessageLocator).toHaveText(menuOption.pageMessage);
  }
});
