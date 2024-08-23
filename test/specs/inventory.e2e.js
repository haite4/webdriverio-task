import loginPage from "../pageobjects/login.page";
import valid_creds from "../../fixtures/valid_creds.json";
import inventoryPage from "../pageobjects/inventory.page";
import { expect as chaiExpect } from "chai";

describe("Inventory page testing", () => {
  beforeEach(async () => {
    loginPage.open();
    await loginPage.login(valid_creds.username, valid_creds.password);
  });

  it("Verify that products info  displayed correctly", async () => {
    const productsName = await inventoryPage.allProductName;
    for await (const el of productsName) {
      await expect(el).toBeDisplayed();
    }

    const productsPrice = await inventoryPage.allProductPrice;
    for await (const el of productsPrice) {
      await expect(el).toBeDisplayed();
    }

    const productsAddToCartButton = await inventoryPage.allAddToCartBtn;
    for await (const el of productsAddToCartButton) {
      await expect(el).toHaveText("Add to cart");
    }

    await expect(await inventoryPage.allInventoryItem).toHaveLength(6);
  });

  it("Verify button changes and cart quantity updates after adding a product", async () => {
    inventoryPage.clickAddToCartBtn();
    const shoppingCartBadge = inventoryPage.shoppingCartBadge;
    const cartQuantity = await shoppingCartBadge.getText();
    const btnText = await inventoryPage.addToCartBtn.getText();
    await expect(shoppingCartBadge).toBeDisplayed();
    await expect(cartQuantity).toEqual("1");
    await expect(btnText).toEqual("Remove");
  });

  it("Verify button changes and cart quantity updates after removing a product", async () => {
    inventoryPage.addThenRemoveItem();
    const btnText = await inventoryPage.addToCartBtn.getText();
    await expect(btnText).toEqual("Add to cart");
    const isBadgeExisting = await inventoryPage.shoppingCartBadge.isExisting();
    chaiExpect(isBadgeExisting).to.be.false;
  });

  it("filter products from (low to high) price", async () => {
    const selectBox = inventoryPage.productSortContainer;
    await selectBox.selectByAttribute("value", "lohi");
    const prices = [];

    for await (const el of inventoryPage.allProductPrice) {
      const priceText = await el.getText();
      const price = parseFloat(priceText.replace("$", ""));
      prices.push(price);
    }

    const sortedPrices = [...prices].sort((a, b) => a - b);
    chaiExpect(prices).to.deep.equal(sortedPrices);
  });

  it("filter products from (high to low)  price", async () => {
    const selectBox = inventoryPage.productSortContainer;
    await selectBox.selectByAttribute("value", "hilo");
    const prices = [];
    for await (const el of inventoryPage.allProductPrice) {
      const priceText = await el.getText();
      const price = parseFloat(priceText.replace("$", ""));
      prices.push(price);
    }
    const sortedPrice = [...prices].sort((a, b) => b - a);
    chaiExpect(prices).to.deep.equal(sortedPrice);
  });

  it("Filter products alphabetically by name (A to Z)", async () => {
    const selectBox = inventoryPage.productSortContainer;
    await selectBox.selectByAttribute("value", "az");
    const names = [];
    for await (const el of inventoryPage.allProductName) {
      const productName = await el.getText();
      names.push(productName);
    }
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    chaiExpect(names).to.deep.equal(sortedNames);
  });

  it("Filter products alphabetically by name (Z to A)", async () => {
    const selectBox = inventoryPage.productSortContainer;
    await selectBox.selectByAttribute("value", "za");
    const names = [];
    for await (const el of inventoryPage.allProductName) {
      const productName = await el.getText();
      names.push(productName);
    }
    const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
    chaiExpect(names).to.deep.equal(sortedNames);
  });

  afterEach(async () => {
    await inventoryPage.clearCart();
  });
});
