//Page to hold all tests related to Home Page
import LoginPage from "../PageObjects/login.page";
import { Browser, chromium, firefox, Page } from "playwright";
import fs = require('fs');
import HomePage from "../PageObjects/home.page";
import BasePage from "../base.page";

//Import 'js-yaml' library
const yaml = require('js-yaml');
//Read contents from the 'config.yaml' file
let fileContents = fs.readFileSync('C:/Users/diwakar.devapalan/Documents/Learn/AutomationProjects/Playwright/playwright-jest-typescript/config.yaml', 'utf8');
/*Load the contents of 'config.yaml' file to 'data' variable.
  The data variable can then be used to read required data from the yaml file */
let data = yaml.safeLoad(fileContents);

//Test suite - Home page
describe('Home page', () => {
    let login: LoginPage;
    let page: Page;
    let browser: Browser;
    let home: HomePage;
    let base: BasePage;
    
    //Run once before start of the first test case in the test suite
    beforeAll( async () => {
        browser = await firefox.launch({
            headless: false
            })
    })

    //Run before every test
    beforeEach( async () => {
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto(data.url);
        login = new LoginPage(page);
        home = new HomePage(page);
        base = new BasePage(page);
    })

    //Test to verify if all menu items are displayed in Home page
    test('Verify menus in Home page', async () => {
        await login.successfulLogin(data.username, data.password);
        await home.verifyAllMenusAreDisplayed();
        await base.takeScreenshot();
    })

    //Run after every test
    afterEach( async () => {
        await page?.close();
    })

    //Run once after the end of the last test case in the test suite
    afterAll( async () => {
        await browser?.close();
    })
})