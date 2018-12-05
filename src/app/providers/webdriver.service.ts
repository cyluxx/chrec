import { Injectable } from '@angular/core';
import { Builder, WebDriver } from 'selenium-webdriver';
import { Browser, Type as BrowserType } from '../model/browser';
import { Sequence } from '../model/sequence';
import { Settings } from '../model/settings';

import * as chrome from 'selenium-webdriver/chrome';

@Injectable()
export class WebdriverService {
    driver: WebDriver;

    private begin(browser: Browser, seleniumGridUrl: string): void {
        console.log('%cStarting Webdriver', 'color: #733CA3; font-weight: bold');
        if (browser.headless && browser.type == BrowserType.chrome) {
            this.driver = new Builder().forBrowser(browser.type)
                .setChromeOptions(new chrome.Options().addArguments('--headless')).build();
        }
        else {
            this.driver = new Builder().forBrowser(browser.type).usingServer(`http://${seleniumGridUrl}/wd/hub`).build();
        }
        this.driver.manage().deleteAllCookies();
        this.driver.manage().window().setSize(browser.width, browser.height);
    }

    private quit(): void {
        this.driver.quit();
    }

    public async run(sequence: Sequence, settings: Settings): Promise<void> {
        for (let browser of settings.browsers) {
            for (let i: number = 0; i < browser.numberIterations; i++) {
                this.begin(browser, settings.seleniumGridUrl);
                for (let i = 0; i < sequence.actions.length; i++) {
                    if (i !== 0 && browser.sleepTimeBetweenActions) {
                        this.driver.sleep(browser.sleepTimeBetweenActions);
                    }
                    await sequence.actions[i].run(this.driver);
                }
                console.log('%cClosing Session', 'color: #733CA3; font-weight: bold');
                this.quit();
            }
        }
    }
}
