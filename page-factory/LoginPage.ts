import { Page, BrowserContext, Locator, expect } from 'playwright/test';
import { WebActions } from "../lib/WebActions";
import { testConfig } from '../testConfig';

let webActions: WebActions;

export class LoginPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly CONTINUE_BUTTON: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.PASSWORD_EDITBOX = page.getByPlaceholder('Password');
        this.USERNAME_EDITBOX = page.getByPlaceholder('Email Address');
        this.LOGIN_BUTTON = page.locator('"Log In"');
        this.CONTINUE_BUTTON =  page.getByRole('button', { name: 'Continue' })
    }

    async navigateToURL(): Promise<void> {
        await this.page.goto(testConfig.URL);
    }

    async clickOnLoginMainButton(): Promise<void> {
        await this.LOGIN_BUTTON.click();
    }

    async loginToApplication(): Promise<void> {
        await this.context.addCookies([
            {
            name: 'captcha-bypass',
            value: 'xxxx',
            // You can specify other properties here if needed
            url: 'https://www.jiosaavn.com'
            }
        ]);
        await this.page.reload()
        await this.page.waitForTimeout(1000); // Wait for 2 seconds
        await this.page.getByText('Email').click();
        await this.USERNAME_EDITBOX.fill(testConfig.username);
        await this.PASSWORD_EDITBOX.fill(testConfig.password);
        await this.CONTINUE_BUTTON.click();
    }

    async verifyProfilePage(): Promise<void> {
        await expect(this.page.getByAltText('Profile')).toBeVisible();
    }
}