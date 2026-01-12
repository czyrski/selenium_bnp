import { By, until } from 'selenium-webdriver';
import assert from 'node:assert';

export class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'https://www.saucedemo.com/';
        // Definiujemy lokalizatory w jednym miejscu
        this.userInput = By.id('user-name');
        this.passInput = By.id('password');
        this.loginBtn = By.id('login-button');
    }

    async open() {
        await this.driver.get(this.url);
    }

    async login(username, password) {
        // Logika interakcji zamknięta w czytelnej metodzie
        await this.driver.wait(until.elementLocated(this.userInput), 5000);
        await this.driver.findElement(this.userInput).sendKeys(username);
        await this.driver.findElement(this.passInput).sendKeys(password);
        await this.driver.findElement(this.loginBtn).click();
    }
}