import { test, expect } from "@playwright/experimental-ct-react";
const local_url = "http://localhost:5173";
const name_budget = "Friend";
const id_cat_budget = `category_${name_budget}`;
const id_checkbox = "cost";
const id_parent_budget = `parent_${name_budget.toLowerCase()}_${id_checkbox}`;
const name_create = `Create new: ${name_budget}`;

test("flow app", async ({ page }) => {
  // login to page
  await page.goto(`${local_url}/login`);
  await page.fill('input[name="email"]', "thaidepzai@gmail.com");
  await page.fill('input[name="password"]', "123123");
  await page.getByRole("button", { name: "Submit" }).click();

  // redirect to main page
  await page.waitForURL(`${local_url}/`);

  // click button create budget
  await page.locator(`#${id_cat_budget}`).click();
  await expect(page.getByText(name_create)).toBeVisible(true);

  // fill data to form create budget
  const amount = "1";
  const title = "taotao";
  const description = "taotao";

  await page.fill('input[name="amount"]', amount);
  await page.fill('input[name="title"]', title);
  await page.fill('textarea[name="description"]', description);
  await page.locator(`#${id_checkbox}`).check();
  await page.getByText("Create One").click();
  await expect(page.getByText(name_create)).toBeHidden(true);

  //   Check budget parent is created ?
  const text = `${name_budget} ${id_checkbox[0].toUpperCase()}${id_checkbox.slice(
    1
  )}`;
  await expect(page.getByText(text)).toBeVisible(true);

  // check budget item is created ?
  await page.locator(`#${id_parent_budget}`).click();
  await page.getByText("close!").click();

  // sign out
  await page.getByText("LOGOUT").click();
  const url_current = page.url();
  await expect(url_current).toMatch(`${local_url}/login`);
});
