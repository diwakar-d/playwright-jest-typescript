import { Page } from "playwright";

export default class LoginPage {
    private page: Page;
    constructor(page: Page){
        this.page = page;
    }

    userNameField = async () => await this.page.$("input[name = 'username']");
    passwordField = async () => await this.page.$("input[name = 'password']");
    loginButton = async () => await this.page.$("input[value = 'Log In']");
    nameOfTheUser = async () => await this.page.$('text= John Smith ')
    wrongPasswordError = async () => await this.page.waitForSelector("p[class = 'title']");

    public async enterUserName(name: string){
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

    public async successfulAssertion(){
        const name = await this.nameOfTheUser();
        await name?.isVisible();
    }

    public async wrongPasswordErrorAssertion(){
        const error = await this.wrongPasswordError();
        await error?.textContent();
        expect(error).toBe('Error!');
    }
}