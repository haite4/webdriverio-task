export default class Page {
  
  get burgerBtn() {
    return $("#react-burger-menu-btn");
  }

  get logoutLink() {
    return $("#logout_sidebar_link");
  }

  async logout() {
    await this.burgerBtn.click();
    await this.logoutLink.click();
  }

  open(path) {
    return browser.url(`${browser.options.baseUrl}${path}`);
  }

  navigateTo(path) {
    return browser.navigateTo(`${browser.options.baseUrl}${path}`);
  }
}
