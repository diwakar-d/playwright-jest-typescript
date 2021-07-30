import { Page } from "playwright";

export default class LoginPage {
    page: Page;
    constructor(page: Page){
        this.page = page;
    }

    userNameField = async () => await this.page.$("input[name = 'username']");
    passwordField = async () => await this.page.$("input[name = 'password']");
    loginButton = async () => await this.page.$("input[value = 'Log In']");

    public async enterUserName(name:string){
        const username = await this.userNameField();
        await username?.fill(name);
    }

    public async enterPassword(password:string){
        const pass = await this.passwordField();
        await pass?.fill(password);
    }

    public async clickOnLogin(){
        const login = await this.loginButton();
        await login?.click();
    }
}