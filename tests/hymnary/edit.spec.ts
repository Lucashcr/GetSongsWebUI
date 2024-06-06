import { test, expect } from "@playwright/test";
import { createHymnaryResolver, detailHymnaryResolver, getExistingHymnaryResolver } from "~/tests/mocks/handlers/hymnary";
import { performUserLoginAndAuthorization } from "~/tests/utils/helpers";
import { categoryResolver } from "../mocks/handlers/api";


test("should change hymnary title", async ({ page }) => {
  page.route("*/**/api/hymnary", getExistingHymnaryResolver);
  page.route("*/**/api/hymnary/", createHymnaryResolver);
  page.route("*/**/api/hymnary/1", detailHymnaryResolver);
  page.route("*/**/api/category/", categoryResolver);
  
  await page.goto("/");

  const loginMenuOption = page.locator("a.v-list-item[href='/auth/login']");
  await loginMenuOption.click();
  
  await performUserLoginAndAuthorization(page);

  const editHymnaryButton = page.locator("button[id='hymnary-1-edit-button']");
  await editHymnaryButton.click();

  const titleButton = page.locator("h2[id='edit-hymnary-title']");
  await titleButton.click();

  const newTitle = "new title";

  const titleInput = page.locator("input[id='edit-hymnary-title-input']");
  await titleInput.fill(newTitle);

  const saveButton = page.locator("button[id='edit-hymnary-title-confirm']");
  await saveButton.click();

  const hymnaryTitle = page.locator("h2[id='edit-hymnary-title']");
  await expect(hymnaryTitle).toContainText(newTitle);
});