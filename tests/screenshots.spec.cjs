const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(process.cwd(), 'docs', 'screenshots');
const shot = (name) => path.join(screenshotsDir, name);

test('README showcase screenshots', async ({ page }) => {
  fs.mkdirSync(screenshotsDir, { recursive: true });

  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const startScreen = page.locator('#startScreen');
  const gradesScreen = page.locator('#gradesScreen');
  const hud = page.locator('#hud');

  await expect(startScreen).toBeVisible({ timeout: 10000 });

  await page.screenshot({
    path: shot('01-start-screen.png'),
    fullPage: true
  });

  await page.evaluate(() => {
    const start = document.querySelector('#startScreen');
    const grades = document.querySelector('#gradesScreen');

    if (start) {
      start.classList.add('hidden');
      start.style.display = 'none';
    }

    if (grades) {
      grades.classList.remove('hidden');
      grades.style.display = 'flex';
      grades.style.visibility = 'visible';
      grades.style.opacity = '1';
    }
  });

  await expect(gradesScreen).toBeVisible({ timeout: 5000 });

  await page.screenshot({
    path: shot('02-grade-history.png'),
    fullPage: true
  });

  await page.evaluate(() => {
    const start = document.querySelector('#startScreen');
    const grades = document.querySelector('#gradesScreen');
    const hud = document.querySelector('#hud');

    if (start) {
      start.classList.add('hidden');
      start.style.display = 'none';
    }

    if (grades) {
      grades.classList.add('hidden');
      grades.style.display = 'none';
    }

    if (hud) {
      hud.classList.remove('hidden');
      hud.style.display = 'block';
      hud.style.visibility = 'visible';
      hud.style.opacity = '1';
    }

    const set = (id, value) => {
      const el = document.querySelector(id);
      if (el) el.textContent = value;
    };

    set('#hudName', 'Playwright Student');
    set('#hudDoors', '1 / 4');
    set('#hudAccuracy', '100%');
    set('#hudThreat', 'CALM');
  });

  await expect(hud).toBeVisible({ timeout: 5000 });

  await page.waitForTimeout(500);

  await page.screenshot({
    path: shot('03-gameplay.png'),
    fullPage: true
  });
});
