import { test, expect } from "@playwright/test";

test.describe("Поиск и навигация", () => {
  test("пользователь заходит на главную, использует поиск, переходит на страницу игры и видит описание", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toContainText("Лучшие игры 2025 года");

    await page.waitForSelector('[data-testid="game-card"]', { timeout: 10000 });

    const searchInput = page.locator('input[placeholder="Поиск"]');
    await searchInput.fill("Hollow");

    await page.waitForTimeout(1000);

    const gameCards = page.locator('[data-testid="game-card"]');
    const count = await gameCards.count();

    if (count > 0) {
      await gameCards.first().click();

      await expect(page).toHaveURL(/\/game\/.+/);

      await expect(page.locator("h1")).toBeVisible();

      const description = page.locator('[class*="description"]');
      await expect(description.first()).toBeVisible({ timeout: 5000 });
    }
  });
});

test.describe("Добавление в избранное", () => {
  test("пользователь добавляет игру в избранное и проверяет, что она там появилась", async ({
    page,
  }) => {
    await page.goto("/");

    await page.waitForSelector('[data-testid="game-card"]', { timeout: 10000 });

    const firstCard = page.locator('[data-testid="game-card"]').first();
    const favoriteButton = firstCard.locator(
      'button[aria-label="Добавить в избранное"]'
    );

    await favoriteButton.click();

    await page.goto("/favorites");

    await expect(page.locator("h1")).toContainText("Избранное");

    const favoriteGames = page.locator('[data-testid="game-card"]');
    await expect(favoriteGames.count()).toBeGreaterThan(0);
  });
});
