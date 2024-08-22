/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
  get burgerBtn() {
    return $("#react-burger-menu-btn");
  }

  get logoutLink() {
    return $("#logout_sidebar_link");
  }

  logout() {
    this.burgerBtn.click();
    this.logoutLink.click();
  }

  open(path) {
    return browser.url(`${browser.options.baseUrl}${path}`);
  }

  navigateTo(path) {
    browser.navigateTo(`${browser.options.baseUrl}${path}`);
  }
}
