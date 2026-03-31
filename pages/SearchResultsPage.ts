import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly usersTab: Locator;

  constructor(page: Page) {
    this.page = page;
    // The users tab in the search results page has a test ID which makes it easier to select reliably, even if the UI changes. This is more robust than trying to select by text or other attributes that may be localized or dynamic.
    this.usersTab = page.getByTestId('nav-item-users');
  }

  async filterByUsers() {
    // waitFor is used to ensure that the users tab is visible before we attempt to click it. This is important because the search results page may take some time to load, and we want to avoid trying to interact with an element that isn't yet available in the DOM.
    await this.usersTab.waitFor({ state: 'visible' });
    await this.usersTab.click();
  }

  async selectUser(userName: string) {
    // Look for a link with the user's name. This is a common pattern in search results where each user is represented as a link with their username as the text. We use first() to ensure that we click on the first matching link, which is important in case there are multiple users with similar names in the search results.
    const userLink = this.page.getByRole('link', { name: userName }).first();
    await userLink.click();
  }
}
