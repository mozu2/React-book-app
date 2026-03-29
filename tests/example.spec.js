// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login'); //qiita用めも　　　これでtest() 使用時に毎回/loginに飛ぶコードがじっこうされる。　
})

test('正しくないメールアドレスを入力した場合', async ({ page }) => {


  await page.getByLabel('パスワード').fill('123');

  await page.getByLabel('メールアドレス').fill('22');

  await page.getByRole('button', { name: '送信' }).click();

  await expect(page.getByText('有効なメールアドレスを設定して。')).toBeVisible();
});

test('なにも入力しなかった場合', async ({ page }) => {
  await page.getByRole('button', { name: '送信' }).click();

  await expect(page.getByText('パスワードを入力してください')).toBeVisible();
  await expect(page.getByText('メールアドレスを入力してください')).toBeVisible();
});

test('成功した場合', async ({ page }) => {
  await page.getByLabel('パスワード').fill('123');

  await page.getByLabel('メールアドレス').fill('test@gmail.com');

  await page.getByRole('button', { name: '送信' }).click();
  await expect(page.getByText('ログインに成功しました。')).toBeVisible();

})