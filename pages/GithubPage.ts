import { Page, Locator } from '@playwright/test';

export class GithubPage {
  readonly page: Page;
  readonly searchButton: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    // Button which opens the search input. It can be tricky to select because of dynamic content and localization, so we use a regex to match the text case-insensitively.
    ///this.searchButton = page.getByRole('button', { name: 'Search or jump to...' });
    this.searchButton = page.getByRole('button').filter({ hasText: /Search or jump to/i });

    // The search input is a combobox role with a specific name. This is more reliable than trying to select by placeholder or other attributes that may change.
    this.searchInput = page.getByRole('combobox', { name: 'Search' });
  }

  async open() {
    await this.page.goto('https://github.com');
  }

  async searchFor(text: string) {
    await this.searchButton.click();
    await this.searchInput.fill(text);
    await this.searchInput.press('Enter');
    // Wait for the URL to change to the search results page, which indicates that the search has been submitted and results are loading. This is important to ensure that subsequent actions are performed on the correct page.
    await this.page.waitForURL(/search/);
  }
}
