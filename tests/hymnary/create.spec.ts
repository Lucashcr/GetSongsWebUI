import { test, expect } from "@playwright/test";
import { createHymnaryResolver, getExistingHymnaryResolver } from "~/tests/mocks/handlers/hymnary";
import { performUserLoginAndAuthorization } from "~/tests/utils/helpers";


test("should not create new hymnary (existing hymnary title)", async ({ page }) => {
  page.route("*/**/api/hymnary", getExistingHymnaryResolver);
  
  await page.goto("/");

  const loginMenuOption = page.locator("a.v-list-item[href='/auth/login']");
  await loginMenuOption.click();

  await performUserLoginAndAuthorization(page);

  const newHymnaryMenuOption = page.locator("a.v-list-item[href='/hymnary/new']");
  await newHymnaryMenuOption.click();

  const titleInput = page.locator("input[id='new-hymnary-title-input']");
  await titleInput.fill("existing test hymnary");

  const newHymnarySubmitButton = page.locator("button[type='submit']");
  await expect(newHymnarySubmitButton).toBeDisabled();
})


test("should create new hymnary", async ({ page }) => {
  page.route("*/**/api/hymnary", getExistingHymnaryResolver);
  page.route("*/**/api/hymnary/", createHymnaryResolver);
  page.route("*/**/api/hymnary/1", getExistingHymnaryResolver);
  
  await page.goto("/");

  const loginMenuOption = page.locator("a.v-list-item[href='/auth/login']");
  await loginMenuOption.click();
  
  await performUserLoginAndAuthorization(page);

  const newHymnaryMenuOption = page.locator("a.v-list-item[href='/hymnary/new']");
  await newHymnaryMenuOption.click();

  const titleInput = page.locator("input[id='new-hymnary-title-input']");
  await titleInput.fill("test hymnary");

  const newHymnarySubmitButton = page.locator("button[type='submit']");
  await newHymnarySubmitButton.click();

  await expect(page).not.toHaveURL("/hymnary/1");
})
