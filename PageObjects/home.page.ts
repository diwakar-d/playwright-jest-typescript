import { Page } from "playwright";

export default class HomePage {
    private page: Page;
    constructor(page: Page){
        this.page = page;
    }

    openNewAccount = async () => await this.page.$("a[href = '/parabank/openaccount.htm']");
    accountsOverview = async () => await this.page.$("a[href = '/parabank/overview.htm']");
    transferFunds = async () => await this.page.$("a[href = '/parabank/transfer.htm']");
    billPay = async () => await this.page.$("a[href = '/parabank/billpay.htm']");
    findTransactions = async () => await this.page.$("a[href = '/parabank/findtrans.htm']");
    updateContact = async () => await this.page.$("a[href = '/parabank/updateProfile.htm']");
    requestLoan = async () => await this.page.$("a[href = '/parabank/requestloan.htm']");
    logOut = async () => await this.page.$("a[href = '/parabank/logout.htm']");
    
    public async verifyAllMenusAreDisplayed(){
        expect(this.openNewAccount).toBeTruthy;
        expect(this.accountsOverview).toBeTruthy;
        expect(this.transferFunds).toBeTruthy;
        expect(this.billPay).toBeTruthy;
        expect(this.findTransactions).toBeTruthy;
        expect(this.updateContact).toBeTruthy;
        expect(this.requestLoan).toBeTruthy;
        expect(this.logOut).toBeTruthy;
    }
}