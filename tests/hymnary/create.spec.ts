import { test, expect } from "@playwright/test";
import { loginResolver, currentUserResolver } from "~/tests/mocks/handlers/auth";
import { createHymnaryResolver, getExistingHymnaryResolver } from "~/tests/mocks/handlers/hymnary";


test("should not create new hymnary (existing hymnary title)", async ({ page }) => {
  page.route("*/**/user/token/", loginResolver);
  page.route("*/**/user/me/", currentUserResolver);
  page.route("*/**/api/hymnary", getExistingHymnaryResolver);
  
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


test("should create new hymnary", async ({ page }) => {
  page.route("*/**/user/token/", loginResolver);
  page.route("*/**/user/me/", currentUserResolver);
  page.route("*/**/api/hymnary", getExistingHymnaryResolver);
  page.route("*/**/api/hymnary/", createHymnaryResolver);
  page.route("*/**/api/hymnary/1", getExistingHymnaryResolver);
  
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
  await titleInput.fill("test hymnary");

  const newHymnarySubmitButton = page.locator("button[type='submit']");
  await newHymnarySubmitButton.click();

  const pageTitle = page.locator("header.v-toolbar div.v-toolbar__content h2");
  await expect(pageTitle).toContainText("Mãos à obra!");
})