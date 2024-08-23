import loginPage from "../pageobjects/login.page";
import valid_creds from "../../fixtures/valid_creds.json";
import inventoryPage from "../pageobjects/inventory.page";
import endpoints from "../../fixtures/endpoints.json";
import { faker } from "@faker-js/faker";

describe("Login page testing", () => {
  beforeEach(async () => {
    loginPage.open();
  });

  it("Verify all needs elements are visible", async () => {
    let webpageElements = [
      loginPage.inputUsername,
      loginPage.inputPassword,
      loginPage.btnSubmit,
      loginPage.loginLogo,
    ];
    for (let i = 0; i < webpageElements.length; i++) {
      await expect(webpageElements[i]).toBeDisplayed();
    }
  });

  it("Verify successful login with valid credentials", async () => {
    await loginPage.login(valid_creds.username, valid_creds.password);
    await expect(inventoryPage.inventoryTitle).toHaveText("Products");
    await expect(browser).toHaveUrl(`${endpoints.base}${endpoints.inventory}`);
  });

  it("Verify errors when loggin in with invalid credentials", async () => {
    for (let i = 0; i < 6; i++) {
      await loginPage.login(
        faker.internet.userName(),
        faker.internet.password()
      );
      await expect(loginPage.errorMessage).toBeDisplayed();
    }
  });
});
