import { Tzatziki } from "tzatziki-core";

import Page from "./navigate";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  public async login(username: string, password: string) {
    await Tzatziki.Action.enterText({
      pageObject: "user",
      inputText: username,
      replaceText: "username",
      //   browser.capabilities.browserName === "chrome" ? "abc" : "username",
    });
    await Tzatziki.Action.enterText({
      pageObject: "password",
      inputText: password,
    });
    await Tzatziki.Action.click({
      pageObject: "submit",
    });
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  public open(path: string) {
    return super.open(path);
  }
}

export default new LoginPage();
