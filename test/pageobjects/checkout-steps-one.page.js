import endpoints from "../../fixtures/endpoints.json";
import Page from "./page";

class CheckoutStepOnePage extends Page {
    
  get title() {
    return $(".title");
  }

  get firstNameInput() {
    return $("#first-name");
  }

  get lastNameInput() {
    return $("#last-name");
  }

  get zipPostalCodeInput() {
    return $("#postal-code");
  }

  get continueBtn() {
    return $("#continue");
  }

  get cancelBtn() {
    return $("#cancel");
  }

  get errorMessage() {
    return $(".error-message-container.error");
  }

  async fillCheckoutForm(firstname, lastname, zipcode) {
    await this.firstNameInput.setValue(firstname);
    await this.lastNameInput.setValue(lastname);
    await this.zipPostalCodeInput.setValue(zipcode);
  }

  clickContinueBtn() {
    this.continueBtn.click();
  }

  clickCancelBtn() {
    this.cancelBtn.click();
  }

  navigateToCheckoutStepOne() {
    return super.navigateTo(endpoints.checkout_step_one);
  }
}

export default new CheckoutStepOnePage();
