import { test, expect } from "@playwright/test";
import { registerResolver } from "~/tests/mocks/handlers/auth";


test("should register user", async ({ page }) => {
  await page.route('*/**/user/register/', registerResolver);

  const user = {
    username: "usertest",
    first_name: "User",
    last_name: "Test",
    email: "usertest@email.com",
    password: "pass15973",
    confirm_password: "pass15973",
  };

  await page.goto("/auth/register");

  for (const key in user) {
    const input = page.locator(`input[id="${key}"]`);
    await input.fill(user[key as keyof typeof user]);
  }

  const submitButton = page.locator("button[type='submit']");
  await submitButton.click();

  const pageTitle = page.locator("header.v-toolbar div.v-toolbar__content h2");
  await expect(pageTitle).toHaveText("Bem-vindo de volta!");
});
