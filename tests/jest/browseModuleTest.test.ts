import {chromium} from "playwright"
import { expect } from "playwright/test";
    
test('browse module', async () => {
    const browser = await chromium.launch({headless:false,channel:'chrome'})
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://www.jiosaavn.com/');
    await page.locator('ul').filter({ hasText: 'New ReleasesTop ChartsTop PlaylistsPodcastsTop ArtistsRadio' }).getByTitle('New Releases').click();
    await expect(page.getByRole('link', { name: 'n New Releases >' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'C Charts >' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'P Top Playlists >' })).toBeVisible();
    await page.getByRole('link', { name: 'S Podcasts >' }).click();
    await page.getByRole('link', { name: 'A Top Artists >' }).click();
    await page.getByRole('link', { name: 'r Radio >' }).click();
    await page.locator('#surprise_me').click();
    await page.getByRole('link', { name: 'For You >' }).click();
    await page.getByRole('link', { name: 'Hindi >' }).click();
    await page.getByRole('link', { name: 'C Charts >' }).click();
    await page.getByText('Trending Today').click();
    await page.getByRole('link', { name: 'Top Playlists' }).click();
    await page.getByRole('link', { name: 'Hindi >' }).click();
    await page.getByRole('link', { name: 'Punjabi >' }).click();
    await page.getByRole('link', { name: 'Podcasts', exact: true }).click();
    await page.locator('ul').filter({ hasText: 'New ReleasesTop ChartsTop PlaylistsPodcastsTop ArtistsRadio' }).getByTitle('Top Artists').click();
    await page.getByRole('link', { name: 'Radio', exact: true }).click();
    await page.getByRole('link', { name: 'Hindi >' }).click();
    await page.getByRole('link', { name: 'For You >' }).click();

    await browser.close()
  },30000);