import { expect, test } from "@playwright/test";
import { currentUserResolver, loginResolver } from "~/tests/mocks/handlers/auth";
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


test.describe("open redirect protection (C3)", () => {
  async function loginWithNext(page: any, next: string) {
    await page.route("*/**/user/token/", loginResolver);
    await page.route("*/**/user/me/", currentUserResolver);
    await page.goto(`/auth/login?next=${encodeURIComponent(next)}`);
    await page.locator("input[id='login-username-input']").fill("usertest");
    await page.locator("input[id='login-password-input']").fill("pass15973");
    await page.locator("button[type='submit']").click();
    await page.waitForTimeout(1000);
  }

  test("safe internal path is followed after login", async ({ page }) => {
    // Use a public, unmocked route to verify the redirect actually follows the path
    // instead of falling back to /hymnary
    await loginWithNext(page, "/about");
    await expect(page).toHaveURL("/about");
  });

  test("external URL is blocked — redirects to /hymnary", async ({ page }) => {
    await loginWithNext(page, "https://evil.com");
    await expect(page).toHaveURL("/hymnary");
  });

  test("protocol-relative URL is blocked — redirects to /hymnary", async ({ page }) => {
    await loginWithNext(page, "//evil.com");
    await expect(page).toHaveURL("/hymnary");
  });

  test("javascript: scheme is blocked — redirects to /hymnary", async ({ page }) => {
    await loginWithNext(page, "javascript:alert(1)");
    await expect(page).toHaveURL("/hymnary");
  });

  test("data: scheme is blocked — redirects to /hymnary", async ({ page }) => {
    await loginWithNext(page, "data:text/html,<h1>xss</h1>");
    await expect(page).toHaveURL("/hymnary");
  });
});