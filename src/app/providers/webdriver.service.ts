import { Injectable } from '@angular/core';
import { Builder, WebDriver } from 'selenium-webdriver';
import { Browser, Type as BrowserType } from '../model/browser';
import { Sequence } from '../model/sequence';
import { Settings } from '../model/settings';

import * as chrome from 'selenium-webdriver/chrome';
import { Project } from '../model/project';

@Injectable()
export class WebdriverService {
    driver: WebDriver;

    private begin(browser: Browser, seleniumGridUrl: string): void {
        console.log('%cStarting Webdriver for: ' + browser.name + ' - ' + browser.type, 'color: #733CA3; font-weight: bold');
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

    private quit(browser: Browser): void {
        console.log('%cClosing Session: ' + browser.name + ' - ' + browser.type, 'color: #733CA3; font-weight: bold');
        this.driver.quit();
    }

    public async run(browser: Browser, settings: Settings): Promise<void> {
        try {
            this.begin(browser, settings.seleniumGridUrl);
            for (let i = 0; i < browser.actions.length; i++) {
                if (i !== 0 && browser.sleepTimeBetweenActions) {
                    this.driver.sleep(browser.sleepTimeBetweenActions);
                }
                await browser.actions[i].run(this.driver);
            }
            this.quit(browser);
            browser.successfulIterations++;
        }
        catch (error) {
            this.logError(`WebdriverService: Run: Failed to run ${browser.name} - ${browser.type}`);
            throw new Error(error);
        }
    }

    public async runAllBrowsers(sequence: Sequence, settings: Settings): Promise<void> {
        for (let browser of sequence.browsers) {

            browser.successfulIterations = 0;
            browser.actions = Object.assign([], sequence.recordedActions);

            for (let i: number = 0; i < browser.numberIterations; i++) {
                try {
                    await this.run(browser, settings);
                }
                catch (error) {
                    this.logError(`WebdriverService: RunAllBrowsers: Failed to run ${browser.name} - ${browser.type} at iteration ${i}`);
                    throw new Error(error);
                }
            }
        }
    }

    public async runAllSequences(project: Project, settings: Settings): Promise<void> {
        for (let sequence of project.sequences) {
            await this.runAllBrowsers(sequence, settings);
        }
    }

    private logError(message: string): void {
        console.log('%c' + message, 'color: #ff4242; font-weight: bold');
    }
}
