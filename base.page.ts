//A page to holde all common methods
import { Page } from "playwright";

export default class BasePage {
    private page: Page;
    constructor(page: Page){
        this.page = page;
    }

    //A full page screenshot that will be stored in 'root' folder
    public async takeScreenshot(){
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
    }
}