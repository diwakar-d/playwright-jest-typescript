import { printCommonLine } from "jest-diff/build/printDiffs";
import { chromium } from "playwright";

const fs = require('fs');
const yaml = require('js-yaml');
let fileContents = fs.readFileSync('C:/Users/diwakar.devapalan/Documents/Learn/AutomationProjects/Playwright/playwright-jest-typescript/config.yaml', 'utf8');
let data = yaml.safeLoad(fileContents);

describe('Login', () => {
    test('Successful Login', async () => {
        const browser = await chromium.launch({
            headless: false
        })
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(data.url);
        await page.fill("input[name = 'username']", data.username);
        await page.fill("input[name = 'password']", data.password);
        await page.click("input[value = 'Log In']");
        await browser.close();
    })
})