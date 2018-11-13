import { Injectable } from '@angular/core';
import { Builder, By, Key, WebDriver, WebElement } from 'selenium-webdriver';
import { Action, Type as ActionType } from '../model/action';
import { Browser } from '../model/browser';
import { Sequence } from '../model/sequence';
import { Settings } from '../model/settings';

@Injectable()
export class WebdriverService {
    driver: WebDriver;

    private begin(browser: Browser, seleniumGridUrl: string): void {
        this.driver = new Builder().forBrowser(browser.type).usingServer(`http://${seleniumGridUrl}/wd/hub`).build();
        this.driver.manage().deleteAllCookies();
        this.driver.manage().window().setSize(browser.width, browser.height);
    }

    private async click(action: Action): Promise<void> {
        try {
            let webElement: WebElement = await this.findElement(action);
            webElement.click();
        }
        catch (error) {
            this.quit();
            throw error;
        }
    }

    private goto(action: Action): void {
        this.driver.get(action.url);
    }

    private type(action: Action): void {
        this.driver.findElement(By.css(action.selectors[0])).sendKeys(action.value, Key.TAB);
    }

    private refresh(): void {
        this.driver.navigate().refresh();
    }

    private forward(): void {
        this.driver.navigate().forward();
    }

    private back(): void {
        this.driver.navigate().back();
    }

    private async findElement(action: Action): Promise<WebElement> {
        return await this.driver.findElement(By.css(action.selectors[0]));
    }

    private quit(): void {
        this.driver.quit();
    }

    public async run(sequence: Sequence, settings: Settings): Promise<void> {
        for (let browser of settings.browsers) {
            for (let i: number = 0; i < settings.numberIterations; i++) {
                this.begin(browser, settings.seleniumGridUrl);
                for (let action of sequence.actions) {
                    if (action.type == ActionType.click) {
                        await this.click(action);
                    }
                    else if (action.type == ActionType.goto) {
                        this.goto(action);
                    }
                    else if (action.type == ActionType.type) {
                        this.type(action);
                    }
                    else if (action.type == ActionType.refresh) {
                        this.refresh();
                    }
                    else if (action.type == ActionType.forward) {
                        this.forward();
                    }
                    else if (action.type == ActionType.back) {
                        this.back();
                    }
                }
                this.quit();
            }
        }
    }
}
