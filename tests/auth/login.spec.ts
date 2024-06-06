import { test, expect } from "@playwright/test";
import { loginResolver, currentUserResolver } from "~/tests/mocks/handlers/auth";
import { performUserLoginAndAuthorization } from "../utils/helpers";


test("should login user", async ({ page }) => {
  await page.route('*/**/user/token/', loginResolver);
  await page.route('*/**/user/me/', currentUserResolver);

  const user = {
    username: "usertest",
    password: "pass15973",
  };

  await page.goto("/auth/login");

  for (const key in user) {
    const input = page.locator(`input[id="login-${key}-input"]`);
    await input.fill(user[key as keyof typeof user]);
  }

  const submitButton = page.locator("button[type='submit']");
  await submitButton.click();

  await page.waitForTimeout(1000);
  await expect(page).toHaveURL("/hymnary");
});


test("should login user (using helper)", async ({ page }) => {
  await page.goto("/auth/login");
  await performUserLoginAndAuthorization(page);
  await expect(page).toHaveURL("/hymnary");
});