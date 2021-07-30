import { Page } from "playwright";

export default class BasePage {
    page: Page;
    constructor(page: Page){
        this.page = page;
    }
}