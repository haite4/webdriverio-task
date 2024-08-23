import cartPage from "../pageobjects/cart.page";
import loginPage from "../pageobjects/login.page";
import valid_creds from "../../fixtures/valid_creds.json";
import inventoryPage from "../pageobjects/inventory.page";
import endpoints from "../../fixtures/endpoints.json";
import { expect as chaiExpect } from "chai";

describe("Cart page testing", () => {
  beforeEach(async () => {
    loginPage.open();
    await loginPage.login(valid_creds.username, valid_creds.password);
  });

  it("Verify that all cart page elements are visible and contain correct text", async () => {
    cartPage.navigateToCart();

    const qtyLabel = cartPage.qtyLabel;
    const checkoutBtn = cartPage.checkoutBtn;
    const continueShoppingBtn = cartPage.continueShoppingBtn;
    const descriptionLabel = cartPage.descriptionLabel;

    await expect(qtyLabel).toBeDisplayed();
    await expect(qtyLabel).toHaveText(expect.stringContaining("QTY"));
    await expect(checkoutBtn).toBeDisplayed();
    await expect(checkoutBtn).toHaveText(expect.stringContaining("Checkout"));
    await expect(continueShoppingBtn).toBeDisplayed();
    await expect(continueShoppingBtn).toHaveText(
      expect.stringContaining("Continue Shopping")
    );
    await expect(descriptionLabel).toBeDisplayed();
    await expect(descriptionLabel).toHaveText(
      expect.stringContaining("Description")
    );
  });

  it("the cart page should display correct item details", async () => {
    inventoryPage.clickAddToCartBtn();
    await browser.waitUntil(
      async () => {
        const buttonText = await inventoryPage.shoppingCartBadge.getText();
        return buttonText === "1";
      },
      {
        timeout: 5000,
        timeoutMsg:
          "Expected the product to be added to the cart, but it didn't happen within the expected time.",
      }
    );

    cartPage.navigateToCart();
    const productRemoveBtn = cartPage.productRemoveBtn;
    const productRemoveBtnText = await productRemoveBtn.getText();
    await expect(cartPage.productName).toBeDisplayed();
    await expect(cartPage.productPrice).toBeDisplayed();
    await expect(cartPage.productDesc).toBeDisplayed();
    await expect(productRemoveBtn).toBeDisplayed();
    await expect(productRemoveBtnText).toEqual("Remove");
  });

  it("should navigate to the inventory page when 'Continue Shopping' is clicked", async () => {
    cartPage.navigateToCart();
    await expect(cartPage.continueShoppingBtn).toBeDisplayed();
    cartPage.clickContinShoppBtn();

    await expect(browser).toHaveUrl(`${endpoints.base}${endpoints.inventory}`);
  });

  it("should navigate to the inventory page when 'Checkout' is clicked", async () => {
    cartPage.navigateToCart();
    await expect(cartPage.checkoutBtn).toBeDisplayed();
    cartPage.clickCheckoutBtn();

    await expect(browser).toHaveUrl(
      `${endpoints.base}${endpoints.checkout_step_one}`
    );
  });

  it("should ensure the product remains in the cart after the user logs out and logs back in", async () => {
    inventoryPage.clickAddToCartBtn();
    await inventoryPage.logout();
    await loginPage.login(valid_creds.username, valid_creds.password);
    cartPage.navigateToCart();

    const cartItemExist = await cartPage.cartItem.isExisting();
    chaiExpect(cartItemExist).to.be.true;
    const cartQuantity = await inventoryPage.shoppingCartBadge.getText();
    await expect(cartQuantity).toEqual("1");
  });

  afterEach(async () => {
    await inventoryPage.clearCart();
  });
});
