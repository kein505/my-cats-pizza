import { test } from '../../fixtures/app.fixture';
import { CleanupApi } from '../api/CleanupApi';
import { testUsers } from '../data/testData';

test.describe('Auth', () => {
  let createUserEmail: string | null = null;

  test.afterAll(async ({ request }) => {
    if (!createUserEmail) return;
    const cleanupApi = new CleanupApi(request);
    await cleanupApi.deleteUserByEmail(createUserEmail);
    createUserEmail = null;
  });

  test('Sign In', async ({ homePage, authPage }) => {
    await homePage.open();
    await authPage.signIn(testUsers.existing.email, testUsers.existing.password);
    await authPage.assertSignIn();
  });

  test('Sign up', async ({ homePage, authPage }) => {
    createUserEmail = `${Date.now()}@test.ru`;
    await homePage.open();
    await authPage.signUp('Тест', testUsers.existing.email, testUsers.existing.password);
    await authPage.assertSignIn();
  });
});
