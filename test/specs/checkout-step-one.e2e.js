import checkoutStepsOnePage from "../pageobjects/checkout-steps-one.page";
import loginPage from "../pageobjects/login.page";
import valid_creds from "../../fixtures/valid_creds.json";
import { faker } from "@faker-js/faker";
import endpoints from "../../fixtures/endpoints.json";

describe("Checkout page testing", () => {
  beforeEach(async () => {
    loginPage.open();
    await loginPage.login(valid_creds.username, valid_creds.password);
    checkoutStepsOnePage.navigateToCheckoutStepOne();
  });

  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const zipcode = faker.location.zipCode();

  it("Verify that all checkout page elements are visible and contain correct text", async () => {
    const firstNamePlaceholder =
      await checkoutStepsOnePage.firstNameInput.getAttribute("placeholder");
    const lastNamePlaceholder =
      await checkoutStepsOnePage.lastNameInput.getAttribute("placeholder");
    const zipPostalCodePlaceholder =
      await checkoutStepsOnePage.zipPostalCodeInput.getAttribute("placeholder");

    await expect(checkoutStepsOnePage.firstNameInput).toBeDisplayed();
    await expect(firstNamePlaceholder).toBe("First Name");

    await expect(checkoutStepsOnePage.lastNameInput).toBeDisplayed();
    await expect(lastNamePlaceholder).toBe("Last Name");

    await expect(checkoutStepsOnePage.zipPostalCodeInput).toBeDisplayed();
    await expect(zipPostalCodePlaceholder).toBe("Zip/Postal Code");

    const cancelBtnText = await checkoutStepsOnePage.cancelBtn.getText();
    await expect(checkoutStepsOnePage.cancelBtn).toBeDisplayed();
    await expect(cancelBtnText).toEqual("Cancel");

    const continueBtnValue =
      await checkoutStepsOnePage.continueBtn.getAttribute("value");
    await expect(checkoutStepsOnePage.continueBtn).toBeDisplayed();
    await expect(continueBtnValue).toEqual("Continue");

    const title = checkoutStepsOnePage.title;
    await expect(title).toBeDisplayed();
    await expect(title).toHaveText("Checkout: Your Information");
  });

  it("should correctly input and verify user details in the checkout form", async () => {
    await checkoutStepsOnePage.fillCheckoutForm(firstname, lastname, zipcode);
    const firstNameValue = await checkoutStepsOnePage.firstNameInput.getValue();
    const lastNameValue = await checkoutStepsOnePage.lastNameInput.getValue();
    const zipCodeValue =
      await checkoutStepsOnePage.zipPostalCodeInput.getValue();

    await expect(firstNameValue).toBe(firstname);
    await expect(lastNameValue).toBe(lastname);
    await expect(zipCodeValue).toBe(zipcode);
  });

  it("should display an error message when submitting an empty checkout form", async () => {
    await checkoutStepsOnePage.fillCheckoutForm("", "", "");
    checkoutStepsOnePage.clickContinueBtn();
    const errorMessage = checkoutStepsOnePage.errorMessage;
    const erroMessageColor = await errorMessage.getCSSProperty(
      "background-color"
    );
    await expect(errorMessage).toBeDisplayed();
    const expectedHexColor = "#e2231a";
    await expect(erroMessageColor.parsed.hex).toBe(expectedHexColor);
  });

  it("should navigate to the correct page when the Continue button is clicked", async () => {
    await checkoutStepsOnePage.fillCheckoutForm(firstname, lastname, zipcode);
    checkoutStepsOnePage.clickContinueBtn();
   
    await expect(browser).toHaveUrl(
      `${endpoints.base}${endpoints.checkout_step_two}`
    );
   
  });

  it("should navigate to the correct page when the Cancel button is clicked", async () => {
    checkoutStepsOnePage.clickCancelBtn();
    await expect(browser).toHaveUrl(`${endpoints.base}${endpoints.cart}`);
  });
});
