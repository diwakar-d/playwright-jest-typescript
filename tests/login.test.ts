import LoginPage from "../PageObjects/login.page";
import { Browser, chromium, Page } from "playwright";
import fs = require('fs');
import BasePage from "../base.page";
const yaml = require('js-yaml');

let fileContents = fs.readFileSync('C:/Users/diwakar.devapalan/Documents/Learn/AutomationProjects/Playwright/playwright-jest-typescript/config.yaml', 'utf8');
let data = yaml.safeLoad(fileContents);

describe('Login', () => {
    let login: LoginPage;
    let page: Page;
    let browser: Browser;
    let base: BasePage;
    
    beforeAll( async () => {
        browser = await chromium.launch({
            headless: false
            })
    })

    beforeEach( async () => {
        const context = await browser.newContext();
        page = await context.newPage();
        login = new LoginPage(page);
        base = new BasePage(page);
        await page.goto(data.url);
    })

    test('Successful Login', async () => {
        await login.enterUserName(data.username);
        await login.enterPassword(data.password);
        await login.clickOnLogin();  
        await login.successfulAssertion();
        base.takeScreenshot();
    })

    test('Incorrect password', async () => {
        await login.enterUserName("john");
        await login.enterPassword("");
        await login.clickOnLogin(); 
        await login.wrongPasswordErrorAssertion(); 
        base.takeScreenshot();
    })

    afterEach( async () => {
        await page?.close();
    })

    afterAll( async () => {
        await browser?.close();
    })
})