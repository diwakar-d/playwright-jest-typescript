import LoginPage from "../PageObjects/login.page";
import { Browser, chromium, Page } from "playwright";
import fs = require('fs');
import BasePage from "../base.page";

//Import 'js-yaml' library
const yaml = require('js-yaml');
//Read contents from the 'config.yaml' file
let fileContents = fs.readFileSync('C:/Users/diwakar.devapalan/Documents/Learn/AutomationProjects/Playwright/playwright-jest-typescript/config.yaml', 'utf8');
/*Load the contents of 'config.yaml' file to 'data' variable.
  The data variable can then be used to read required data from the yaml file */
let data = yaml.safeLoad(fileContents);

//Test suite - Login
describe('Login', () => {
    let login: LoginPage;
    let page: Page;
    let browser: Browser;
    let base: BasePage;
    
    //Run once before start of the first test case in the test suite
    beforeAll( async () => {
        browser = await chromium.launch({
            headless: false
            })
    })

    //Run before every test
    beforeEach( async () => {
        const context = await browser.newContext();
        page = await context.newPage();
        login = new LoginPage(page);
        base = new BasePage(page);
        await page.goto(data.url);
    })

    //Verify if user is able to login succesfully when correct username and password is entered
    test('Successful Login', async () => {
        await login.enterUserName(data.username);
        await login.enterPassword(data.password);
        await login.clickOnLogin();  
        await login.successfulAssertion();
        base.takeScreenshot();
    })

    //Verify if application displays correct error when user tries to login without entering password
    test('Incorrect password', async () => {
        await login.enterUserName("john");
        await login.enterPassword("");
        await login.clickOnLogin(); 
        await login.wrongPasswordErrorAssertion(); 
        base.takeScreenshot();
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