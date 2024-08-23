import Page from "./page";
import endpoints from "../../fixtures/endpoints.json";

class CartPage extends Page {
  get qtyLabel() {
    return $(".cart_quantity_label");
  }

  get descriptionLabel() {
    return $(".cart_desc_label");
  }

  get checkoutBtn() {
    return $("#checkout");
  }

  get continueShoppingBtn() {
    return $("#continue-shopping");
  }

  get productName() {
    return $(".inventory_item_name");
  }

  get productDesc() {
    return $(".inventory_item_desc");
  }

  get productPrice() {
    return $(".inventory_item_price");
  }

  get productRemoveBtn() {
    return $(".cart_button");
  }

  get cartItem() {
    return $(".cart_item");
  }

  clickContinShoppBtn() {
    this.continueShoppingBtn.click();
  }

  clickCheckoutBtn() {
    this.checkoutBtn.click();
  }

  navigateToCart() {
    return super.navigateTo(endpoints.cart);
  }
}

export default new CartPage();
