import { Given, When, Then } from "@cucumber/cucumber";

import LoginPage from "../login.page";
// import SecurePage from "../../../sevices/secure-service/secure.page";

const pages = {
  login: LoginPage,
};

Given(
  /^I am on the (\w+) page "(.*)"$/,
  async (_page: string, path: string) => {
    await LoginPage.open(path);
  }
);

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
  await LoginPage.login(username, password);
});

Then(/^I should see a flash message saying (.*)$/, async (_message) => {
  // await expect(SecurePage.flashAlert).toBeExisting();
  // await expect(SecurePage.flashAlert).toHaveTextContaining(message);
});
