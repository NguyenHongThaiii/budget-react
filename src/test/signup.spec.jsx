import { test, expect } from "@playwright/experimental-ct-react";
const local_url = "http://localhost:5173";
test("Sign up test correctly", async ({ page }) => {
  await page.goto(`${local_url}/register`);

  await page.fill('input[name="email"]', "toandepzai123@gmail.com");
  await page.fill('input[name="password"]', "123123");
  await page.fill('input[name="passwordConfirm"]', "123123");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.waitForURL(`${local_url}/login`);
  const url = await page.url();

  await expect(url).toMatch(`${local_url}/login`);
});

test("Sign up test with empty data passed", async ({ page }) => {
  await page.goto(`${local_url}/register`);

  await page.fill('input[name="email"]', "");
  await page.fill('input[name="password"]', "");
  await page.fill('input[name="passwordConfirm"]', "");
  await page.getByRole("button", { name: "Submit" }).click();
  const url = await page.url();

  await expect(url).toMatch(`${local_url}/register`);
});

test("Sign up test with user exist", async ({ page }) => {
  await page.goto(`${local_url}/register`);

  await page.fill('input[name="email"]', "thaidepzai@gmail.com");
  await page.fill('input[name="password"]', "123123");
  await page.fill('input[name="passwordConfirm"]', "123123");
  await page.getByRole("button", { name: "Submit" }).click();
  const url = await page.url();
  await expect(url).toMatch(`${local_url}/register`);
});
