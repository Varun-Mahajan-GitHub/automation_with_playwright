
import {chromium} from "playwright"
import * as Chance from 'chance';
import { expect } from "playwright/test";
const API_KEY = "xxxx"

test('Sign up on jiosaavn site', async()=>{
    const browser = await chromium.launch({headless:false,channel:'chrome'});
    const context = await browser.newContext()
    const page = await context.newPage()
    const chance = new Chance()

    // Navigate to a website
    await page.goto('https://www.jiosaavn.com');
    await page.click('"Log In"');
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await context.addCookies([
        {
        name: 'captcha-bypass',
        value: API_KEY,
        // You can specify other properties here if needed
        url: 'https://www.jiosaavn.com'
        }
    ]);
    await page.reload()
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.getByTitle('Sign Up').click()
    await page.locator('span.c-btn.c-btn--quaternary.c-btn--short.c-btn--wide').click();
    const dummy_email = chance.name().replace(/\s/g, '')+'@saavn.com'

    await page.fill('//input[@name="email"]',dummy_email)
    await page.fill('//input[@placeholder="Password"]','Saavn@123')
    await page.fill('//input[@placeholder="Confirm Password"]','Saavn@123')
    await page.click('button:text("Continue")')
    await expect(page.getByAltText('Profile')).toBeVisible()
    

    // Close the browser
    await browser.close();
},60000)


