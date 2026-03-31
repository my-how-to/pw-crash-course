import { test, expect } from '@playwright/test';
import { GithubPage } from '../pages/GithubPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

test('полный цикл поиска пользователя', async ({ page }) => {
  const github = new GithubPage(page);
  const results = new SearchResultsPage(page);

  // step 1: Open GitHub and search for the user
  await github.open();
  await github.searchFor('Alexandru my-how-to');

  // step 2: Filter by users
  await results.filterByUsers();
  
  // step 3: Select the user
  await results.selectUser('Alexandru');

  // step 4: Verify the user page
  // Check that the main content contains the username, which indicates we've navigated to the correct profile page
  await expect(page.locator('main')).toContainText('Alexandru');
});
