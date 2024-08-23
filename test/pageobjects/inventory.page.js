import Page from "./page";

class InventoryPage extends Page {
  get inventoryTitle() {
    return $("span.title");
  }

  get allProductName() {
    return $$("[data-test='inventory-item-name']");
  }

  get allInventoryItem() {
    return $$(".inventory_item");
  }

  get allProductPrice() {
    return $$(".inventory_item_price");
  }

  get allAddToCartBtn() {
    return $$(".btn_inventory ");
  }

  get addToCartBtn() {
    return $(".btn_inventory ");
  }

  get shoppingCartBadge() {
    return $(".shopping_cart_badge");
  }

  get productSortContainer() {
    return $(".product_sort_container");
  }

  clickAddToCartBtn() {
    this.addToCartBtn.click();
  }

  addThenRemoveItem() {
    this.addToCartBtn.doubleClick();
  }

  async clearCart() {
    const allBtn = await this.allAddToCartBtn;
    for await (const el of allBtn) {
      if ((await el.getText()) == "Remove") {
        el.click();
      }
    }
  }
}

export default new InventoryPage();
