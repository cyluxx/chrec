import { Injectable } from '@angular/core';
import { Builder, By, Key, WebDriver } from 'selenium-webdriver';
import { Action, Type as ActionType } from '../model/action';
import { Browser } from '../model/browser';
import * as fs from 'fs';
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

    private click(action: Action): void {
        this.driver.findElement(By.css(action.selectors[0])).click();
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

    private customScreenshot(action: Action): void {
        this.driver.takeScreenshot().then((data) => {
            fs.writeFile(
                './screenshots/custom/' + action.filename,
                data.replace(/^data:image\/png;base64,/, ''),
                'base64',
                (error) => {
                    if (error) {
                        throw error;
                    }
                });
        });
    }

    private quit(): void {
        this.driver.quit();
    }

    public run(sequence: Sequence, settings: Settings): void {
        for (let browser of settings.browsers) {
            for (let i: number = 0; i < settings.numberIterations; i++) {
                this.begin(browser, settings.seleniumGridUrl);
                for (let action of sequence.actions) {
                    if (action.type == ActionType.click) {
                        this.click(action);
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
                    else if (action.type == ActionType.screenshot) {
                        try {
                            this.customScreenshot(action);
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }
                }
                this.quit();
            }
        }
    }
}
