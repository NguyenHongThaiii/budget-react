import { test, expect } from "@playwright/experimental-ct-react";
const local_url = "http://localhost:5173";
test("Login Page Test correctly data", async ({ page }) => {
  await page.goto(`${local_url}/login`);

  await page.fill('input[name="email"]', "thaidepzai@gmail.com");
  await page.fill('input[name="password"]', "123123");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.waitForURL(`${local_url}/`);
  const url = await page.url();
  console.error(url);

  await expect(url).toMatch(`${local_url}/`);
});
test("Login Page Test with incorrect data", async ({ page }) => {
  await page.goto(`${local_url}/login`);

  await page.fill('input[name="email"]', "thaidepzai@gmail.com");
  await page.fill('input[name="password"]', "123123q2323123123123");
  await page.getByRole("button", { name: "Submit" }).click();

  const url = await page.url();
  console.error(url);

  await expect(url).toMatch(`${local_url}/login`);
});

test("Login Page Test with empty data", async ({ page }) => {
  await page.goto(`${local_url}/login`);

  await page.fill('input[name="email"]', "");
  await page.fill('input[name="password"]', "");
  await page.getByRole("button", { name: "Submit" }).click();

  const url = await page.url();
  console.error(url);

  await expect(url).toMatch(`${local_url}/login`);
});
