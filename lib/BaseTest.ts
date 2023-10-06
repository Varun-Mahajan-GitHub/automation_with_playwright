import { test as baseTest } from 'playwright/test';
import { LoginPage } from '../page-factory/LoginPage';
import { chromium } from 'playwright/test';

const test = baseTest.extend<{
    loginPage: LoginPage;
}>({
    loginPage: async ({}, use) => {
        const browser = await chromium.launch({headless:false,channel:'chrome'});
        const context = await browser.newContext()
        const page = await context.newPage()
        await use(new LoginPage(page, context));
    }
})

export default test;