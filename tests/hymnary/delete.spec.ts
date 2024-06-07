import { test, expect } from "@playwright/test";
import { deleteHymnaryResolver, getEmptyListHymnaryResolver, getExistingHymnaryResolver } from "~/tests/mocks/handlers/hymnary";
import { performUserLoginAndAuthorization } from "../utils/helpers";


test("should not delete hymnary (canceled by user)", async ({ page }) => {
  page.route("*/**/api/hymnary?dateFilter=created_at&page=1", getExistingHymnaryResolver);

  await page.goto("/auth/login");
  await performUserLoginAndAuthorization(page);
  await expect(page).toHaveURL("/hymnary");
  
  const deleteButton = page.locator("button[id='hymnary-1-delete-button']");
  await deleteButton.click();
  
  page.route("*/**/api/hymnary/1", deleteHymnaryResolver);
  const confirmButton = page.locator("button[id='cancel-delete-button']");
  await confirmButton.click();

  page.route("*/**/api/hymnary", getEmptyListHymnaryResolver);
  const deleteButton2 = page.locator("button[id='hymnary-1-delete-button']");
  await expect(deleteButton2).toBeVisible();
})


test("should delete hymnary", async ({ page }) => {
  page.route("*/**/api/hymnary?dateFilter=created_at&page=1", getExistingHymnaryResolver);
  
  await page.goto("/auth/login");
  await performUserLoginAndAuthorization(page);
  await expect(page).toHaveURL("/hymnary");
  
  const deleteButton = page.locator("button[id='hymnary-1-delete-button']");
  await deleteButton.click();
  
  page.route("*/**/api/hymnary/1", deleteHymnaryResolver);
  const confirmButton = page.locator("button[id='confirm-delete-button']");
  await confirmButton.click();

  page.route("*/**/api/hymnary", getEmptyListHymnaryResolver);
  const deleteButton2 = page.locator("button[id='hymnary-1-delete-button']");
  await expect(deleteButton2).not.toBeVisible();
})