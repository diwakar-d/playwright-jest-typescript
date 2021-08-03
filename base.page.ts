import { Page } from "playwright";

export default class BasePage {
    private page: Page;
    constructor(page: Page){
        this.page = page;
    }

    public async takeScreenshot(){
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
    }
}