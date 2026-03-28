// @ts-check
import { test, expect } from '@playwright/test';

test('ログイン画面にアクセスする', async ({ page }) => {
  await page.goto('/login');

  await page.getByLabel('パスワード').fill('123');

  await page.getByLabel('メールアドレス').fill('22');

  await page.getByRole('button', { name: '送信' }).click();

  await expect(page.getByText('有効なメールアドレスを設定して。')).toBeVisible();
});