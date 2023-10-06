import { Page, BrowserContext, Locator, expect } from 'playwright/test';
import { WebActions } from "../lib/WebActions";
import { testConfig } from '../testConfig';

let webActions: WebActions;

export class BrowsePage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly USERNAME_EDITBOX: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.USERNAME_EDITBOX = page.getByPlaceholder('Email Address');
    }

    async navigateToURL(): Promise<void> {
        await this.page.goto(testConfig.URL);
    }
}