import { Injectable } from '@angular/core';
import { Builder, By, Key, WebDriver } from 'selenium-webdriver';
import { Action, Type } from '../model/action';
import * as fs from 'fs';

@Injectable()
export class WebdriverService {
    driver: WebDriver;

    private begin(): void {
        this.driver = new Builder().forBrowser('chrome').usingServer('http://localhost:4444/wd/hub').build();
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

    private generatedScreenshot(action: Action): void {
        action.filename = action.id + '.png';
        this.driver.takeScreenshot().then((data) => {
            fs.writeFile(
                './screenshots/generated/' + action.filename,
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

    public run(actions: Action[]): void {
        this.begin();
        for (let action of actions) {
            if (action.type == Type.click) {
                this.click(action);
            }
            else if (action.type == Type.goto) {
                this.goto(action);
            }
            else if (action.type == Type.type) {
                this.type(action);
            }
            else if (action.type == Type.refresh) {
                this.refresh();
            }
            else if (action.type == Type.forward) {
                this.forward();
            }
            else if (action.type == Type.back) {
                this.back();
            }
            else if (action.type == Type.screenshot) {
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
