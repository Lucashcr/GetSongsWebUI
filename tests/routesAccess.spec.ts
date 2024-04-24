import { test, expect } from "@playwright/test";
import { loginResolver, currentUserResolver } from "~/tests/mocks/handlers/auth";


test("should access index page", async ({ page }) => {
  await page.goto("/");

  const title = page.locator("title");
  await expect(await title.textContent()).toBe("GetSongs");

  const pageMessage = page.locator(
    "header.v-toolbar div.v-toolbar__content h2"
  );
  await expect(pageMessage).toHaveText("Bem-vindo ao GetSongs!");
});


test("access pages by menu (unlogged user)", async ({ page }) => {
  await page.goto("/");

  const menuLinks = await page.locator("a.v-list-item").all();

  const pageMessageMap = {
    "/": "Bem-vindo ao GetSongs!",
    "/auth/login": "Bem-vindo de volta!",
    "/auth/register": "Junte-se a nós!",
    "/about": "Curioso sobre o projeto?",
  };

  for (const menuLink of menuLinks) {
    const href = await menuLink.getAttribute("href");
    await menuLink.click();

    const pageMessage = page.locator(
      "header.v-toolbar div.v-toolbar__content h2"
    );

    if (!href) {
      throw new Error("href not found");
    }

    await expect(pageMessage).toHaveText(
      pageMessageMap[href as keyof typeof pageMessageMap]
    );
  }
});


test("access pages by menu (logged user)", async ({ page }) => {
  page.route("*/**/user/token/", loginResolver);
  page.route("*/**/user/me/", currentUserResolver);

  await page.goto("/auth/login");

  const usernameInput = page.locator("input[id='username']");
  const passwordInput = page.locator("input[id='password']");
  const submitButton = page.locator("button[type='submit']");

  await Promise.all([
    usernameInput.fill("usertest"),
    passwordInput.fill("pass15973"),
  ]);
  await submitButton.click();

  const pageTitle = page.locator("header.v-toolbar div.v-toolbar__content h2")
  await expect(pageTitle).toHaveText("Aqui estão seus hinários!");

  const menuLinks = await page.locator("a.v-list-item").all();

  const pageMessageMap = {
    "/": "Bem-vindo ao GetSongs!",
    "/hymnary/new": "Vamos criar um novo hinário!",
    "/hymnary": "Aqui estão seus hinários!",
    "/auth/profile": "Deseja editar o seu perfil?",
    "/contact": "Fale conosco!",
    "/auth/logout": "Já vai?",
    "/about": "Curioso sobre o projeto?",
  };

  for (const menuLink of menuLinks) {
    const href = await menuLink.getAttribute("href");
    await menuLink.click();

    const pageMessage = page.locator(
      "header.v-toolbar div.v-toolbar__content h2"
    );

    if (!href) {
      throw new Error("href not found");
    }

    await expect(pageMessage).toHaveText(
      pageMessageMap[href as keyof typeof pageMessageMap]
    );
  }
});
