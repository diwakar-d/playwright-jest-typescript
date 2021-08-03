import LoginPage from "../PageObjects/login.page";
import { Browser, chromium, Page } from "playwright";
import fs = require('fs');
import HomePage from "../PageObjects/home.page";
import BasePage from "../base.page";
const yaml = require('js-yaml');

let fileContents = fs.readFileSync('C:/Users/diwakar.devapalan/Documents/Learn/AutomationProjects/Playwright/playwright-jest-typescript/config.yaml', 'utf8');
let data = yaml.safeLoad(fileContents);

describe('Login', () => {
    let login: LoginPage;
    let page: Page;
    let browser: Browser;
    let home: HomePage;
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
        home = new HomePage(page);
        base = new BasePage(page);
        await page.goto(data.url);
    })

    test('Verify menus in Home page', async () => {
        await login.successfulLogin(data.username, data.password);
        await home.verifyAllMenusAreDisplayed();
        await base.takeScreenshot();
    })

    afterEach( async () => {
        await page?.close();
    })

    afterAll( async () => {
        await browser?.close();
    })
})