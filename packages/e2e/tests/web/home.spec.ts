import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display Turborepo/with-tailwind in the page', async ({ page }) => {
        // Verify if "Turborepo/with-tailwind" text is visible on the page
        await expect(page.locator('p')).toContainText('Turborepo/with-tailwind');
    });
});
