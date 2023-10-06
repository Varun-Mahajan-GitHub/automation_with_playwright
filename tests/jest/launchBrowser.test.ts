
import {chromium} from "playwright"
import {expect } from "playwright/test";

test('Open jiosaavn site', async()=>{
    const browser = await chromium.launch({headless:false,channel:'chrome'});
    const context = await browser.newContext()
    const page = await context.newPage()

    // Navigate to a website
    await page.goto('https://www.jiosaavn.com');
    await page.click('"Log In"');
    await context.addCookies([
        {
        name: 'captcha-bypass',
        value: '6R1VzqByL1WCfSfTwiUcRWqO2YcftgB1u4',
        // You can specify other properties here if needed
        url: 'https://www.jiosaavn.com'
        }
    ]);
    await page.reload()
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await page.locator('span.c-btn.c-btn--quaternary.c-btn--short.c-btn--wide').click();

    await page.fill('//input[@name="email"]',"vm888@saavn.com")
    await page.fill('//input[@placeholder="Password"]','Saavn@123')
    await page.click('button:text("Continue")')
    await expect(page.getByAltText('Profile')).toBeVisible()
    

    // Close the browser
    await browser.close();
},60000)


