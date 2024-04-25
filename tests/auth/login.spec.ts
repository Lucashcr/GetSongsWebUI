import { test, expect } from "@playwright/test";
import { loginResolver, currentUserResolver } from "~/tests/mocks/handlers/auth";


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

  const pageTitle = page.locator("header.v-toolbar div.v-toolbar__content h2");
  await expect(pageTitle).toContainText("Aqui estão seus hinários!");
});
