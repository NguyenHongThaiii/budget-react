import { test, expect } from "@playwright/experimental-ct-react";
import { LoginPage } from "./class-common";

// Sign up
test("Sign up test correctly", async ({ page }) => {
  await page.goto("http://localhost:5173/register");

  await page.fill('input[name="email"]', "thaidepzai@gmail.com");
  await page.fill('input[name="password"]', "123123");
  await page.fill('input[name="passwordConfirm"]', "123123");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.waitForURL("http://localhost:5173/login");

  await expect(page.getByText("Login Form")).toBeVisible();
});

test("Sign up test with empty data passed", async ({ page }) => {
  await page.goto("http://localhost:5173/register");

  await page.fill('input[name="email"]', "");
  await page.fill('input[name="password"]', "");
  await page.fill('input[name="passwordConfirm"]', "");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.waitForURL("http://localhost:5173/login");

  await expect(page.getByText("Login Form")).toBeVisible();
});

test("Sign up test with user exist", async ({ page }) => {
  await page.goto("http://localhost:5173/register");

  await page.fill('input[name="email"]', "thaidepzai@gmail.com");
  await page.fill('input[name="password"]', "123123");
  await page.fill('input[name="passwordConfirm"]', "123123");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.waitForURL("http://localhost:5173/login");

  await expect(page.getByText("Login Form")).toBeVisible();
});

// Login

test("Login Page Test correctly data", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.fill('input[name="email"]', "thaidepzai@gmail.com");
  await page.fill('input[name="password"]', "123123");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.waitForURL("http://localhost:5173");
  const url = await page.url();
  console.error(url);
  await expect(page.getByText("Total Budget")).toBeVisible();
});

test("Login Page Test with incorrect data", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.fill('input[name="email"]', "thaidepzai@gmail.com");
  await page.fill('input[name="password"]', "123123");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.waitForURL("http://localhost:5173");
  const url = await page.url();
  console.error(url);
  await expect(page.getByText("Total Budget")).toBeVisible();
});

test("Login Page Test with empty data", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.fill('input[name="email"]', "thaidepzai@gmail.com");
  await page.fill('input[name="password"]', "123123");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.waitForURL("http://localhost:5173");
  const url = await page.url();
  console.error(url);
  await expect(page.getByText("Total Budget")).toBeVisible();
});
