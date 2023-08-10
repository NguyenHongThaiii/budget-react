export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("http://localhost:5173/login");
  }

  async fillLoginForm(email, password) {
    await this.page.fill('input[name="email"]', email);
    await this.page.fill('input[name="password"]', password);
  }

  async submitLoginForm() {
    await this.page.click('button[type="submit"]');
    await this.page.goto("http://localhost:5173");
  }

  async isLoggedIn() {
    await this.page.waitForNavigation();

    const successURLPattern = "http://localhost:5173";
    const currentURL = await this.page.url();

    const errorElement = await this.page.$(".error-message");

    if (currentURL.includes(successURLPattern) && !errorElement) {
      return true;
    }

    return false;
  }
}
