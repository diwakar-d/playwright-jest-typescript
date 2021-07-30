import { Browser, chromium, Page } from "playwright";
import LoginPage from "../PageObjects/login.page";
import BasePage from "../base.page";

const fs = require('fs');
const yaml = require('js-yaml');
let fileContents = fs.readFileSync('C:/Users/diwakar.devapalan/Documents/Learn/AutomationProjects/Playwright/playwright-jest-typescript/config.yaml', 'utf8');
let data = yaml.safeLoad(fileContents);
let page: Page;
let login: LoginPage;
let browser:Browser;
let base: BasePage;

describe('Login', () => {
    beforeAll( async () => {
        login = new LoginPage(page);
    })

    beforeEach( async () => {
        browser = await chromium.launch({
        headless: false
        })
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(data.url);
    })

    test('Successful Login', async () => {
        await login.enterUserName(data.username);
        await login.enterPassword(data.password);
        await login.clickOnLogin();  
    })

    afterEach( async () => {
        await browser.close();
    })
})