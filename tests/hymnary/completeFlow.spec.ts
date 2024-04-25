import { test, expect } from "@playwright/test";
import { loginResolver, currentUserResolver } from "~/tests/mocks/handlers/auth";
import { hymnaryResolver } from "~/tests/mocks/handlers/hymnary";


test("should not complete user flow (existing hymnary title)", async ({ page }) => {
  page.route("*/**/user/token/", loginResolver);
  page.route("*/**/user/me/", currentUserResolver);
  page.route("*/**/api/hymnary/", hymnaryResolver);
  page.route("*/**/api/hymnary", hymnaryResolver);
  
  await page.goto("/");

  const loginMenuOption = page.locator("a.v-list-item[href='/auth/login']");
  await loginMenuOption.click();

  const usernameInput = page.locator("input[id='login-username-input']");
  const passwordInput = page.locator("input[id='login-password-input']");
  const loginSubmitButton = page.locator("button[type='submit']");

  await Promise.all([
    usernameInput.fill("usertest"),
    passwordInput.fill("testpassword"),
  ]);
  await loginSubmitButton.click();

  const newHymnaryMenuOption = page.locator("a.v-list-item[href='/hymnary/new']");
  await newHymnaryMenuOption.click();

  const titleInput = page.locator("input[id='new-hymnary-title-input']");
  await titleInput.fill("existing test hymnary");

  const newHymnarySubmitButton = page.locator("button[type='submit']");
  await expect(newHymnarySubmitButton).toBeDisabled();
})