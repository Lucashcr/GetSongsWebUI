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
    const input = page.locator(`input[id="register-${key}-input"]`);
    await input.fill(user[key as keyof typeof user]);
  }

  const submitButton = page.locator("button[type='submit']");
  await submitButton.click();

  const pageTitle = page.locator("header.v-toolbar div.v-toolbar__content h2");
  await expect(pageTitle).toContainText("Bem-vindo de volta!");
});


test("should not register user (empty first name)", async ({ page }) => {
  const user = {
    username: "usertest",
    first_name: "",
    last_name: "Test",
    email: "usertest@email.com",
    password: "pass15973",
    confirm_password: "pass15973",
  };

  await page.goto("/auth/register");

  for (const key in user) {
    const input = page.locator(`input[id="register-${key}-input"]`);
    await input.fill(user[key as keyof typeof user]);
  }

  const submitButton = page.locator("button[type='submit']");
  await submitButton.click();

  const vAlert = page.locator("div.v-alert");
  await expect(vAlert).toContainText("Nome é obrigatório.");
});


test("should not register user (empty email)", async ({ page }) => {
  const user = {
    username: "usertest",
    first_name: "User",
    last_name: "Test",
    email: "",
    password: "pass15973",
    confirm_password: "pass15973",
  };

  await page.goto("/auth/register");

  for (const key in user) {
    const input = page.locator(`input[id="register-${key}-input"]`);
    await input.fill(user[key as keyof typeof user]);
  }

  const submitButton = page.locator("button[type='submit']");
  await submitButton.click();

  const vAlert = page.locator("div.v-alert");
  await expect(vAlert).toContainText("E-mail é obrigatório.");
});


test("should not register user (invalid email)", async ({ page }) => {
  const user = {
    username: "usertest",
    first_name: "User",
    last_name: "Test",
    email: "usertestemail.com",
    password: "pass15973",
    confirm_password: "pass15973",
  };

  await page.goto("/auth/register");

  for (const key in user) {
    const input = page.locator(`input[id="register-${key}-input"]`);
    await input.fill(user[key as keyof typeof user]);
  }

  const submitButton = page.locator("button[type='submit']");
  await submitButton.click();

  const vAlert = page.locator("div.v-alert");
  await expect(vAlert).toContainText("E-mail deve ser válido.");
});


test("should not register user (empty password)", async ({ page }) => {
  const user = {
    username: "usertest",
    first_name: "User",
    last_name: "Test",
    email: "usertest@email.com",
    password: "",
    confirm_password: "pass15973",
  };

  await page.goto("/auth/register");

  for (const key in user) {
    const input = page.locator(`input[id="register-${key}-input"]`);
    await input.fill(user[key as keyof typeof user]);
  }

  const submitButton = page.locator("button[type='submit']");
  await submitButton.click();

  const vAlert = page.locator("div.v-alert");
  await expect(vAlert).toContainText("Senha é obrigatória.");
});


test("should not register user (password length)", async ({ page }) => {
  const user = {
    username: "usertest",
    first_name: "User",
    last_name: "Test",
    email: "usertest@email.com",
    password: "",
    confirm_password: "pass159",
  };

  await page.goto("/auth/register");

  for (const key in user) {
    const input = page.locator(`input[id="register-${key}-input"]`);
    await input.fill(user[key as keyof typeof user]);
  }

  const submitButton = page.locator("button[type='submit']");
  await submitButton.click();

  const vAlert = page.locator("div.v-alert");
  await expect(vAlert).toContainText("Senha deve ter no mínimo 8 caracteres.");
});


test("should not register user (empty confirmation password)", async ({ page }) => {
  const user = {
    username: "usertest",
    first_name: "User",
    last_name: "Test",
    email: "usertest@email.com",
    password: "pass15973",
    confirm_password: "",
  };

  await page.goto("/auth/register");

  for (const key in user) {
    const input = page.locator(`input[id="register-${key}-input"]`);
    await input.fill(user[key as keyof typeof user]);
  }

  const submitButton = page.locator("button[type='submit']");
  await submitButton.click();

  const vAlert = page.locator("div.v-alert");
  await expect(vAlert).toContainText("Confirmação de senha é obrigatória.");
});


test("should not register user (confirmation password not match)", async ({ page }) => {
  const user = {
    username: "usertest",
    first_name: "User",
    last_name: "Test",
    email: "usertest@email.com",
    password: "pass15973",
    confirm_password: "pass15937",
  };

  await page.goto("/auth/register");

  for (const key in user) {
    const input = page.locator(`input[id="register-${key}-input"]`);
    await input.fill(user[key as keyof typeof user]);
  }

  const submitButton = page.locator("button[type='submit']");
  await submitButton.click();

  const vAlert = page.locator("div.v-alert");
  await expect(vAlert).toContainText("As senhas não conferem.");
});
