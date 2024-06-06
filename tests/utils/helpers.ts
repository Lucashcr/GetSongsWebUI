import type { Page } from "playwright";

import { loginResolver, currentUserResolver } from "~/tests/mocks/handlers/auth";


export async function performUserLoginAndAuthorization(page: Page) {
  page.route("*/**/user/token/", loginResolver);
  page.route("*/**/user/me/", currentUserResolver);

  const usernameInput = page.locator("input[id='login-username-input']");
  const passwordInput = page.locator("input[id='login-password-input']");
  const loginSubmitButton = page.locator("button[type='submit']");

  await Promise.all([
    usernameInput.fill("usertest"),
    passwordInput.fill("testpassword"),
  ]);
  await loginSubmitButton.click();
  await page.waitForTimeout(1000);
}
