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
        this.begin(browser, settings.seleniumGridUrl);
        for (let i = 0; i < browser.actions.length; i++) {
            if (i !== 0 && browser.sleepTimeBetweenActions) {
                this.driver.sleep(browser.sleepTimeBetweenActions);
            }
            await browser.actions[i].run(this.driver);
        }
        this.quit(browser);
    }

    public async runAllBrowsers(sequence: Sequence, settings: Settings): Promise<void> {
        sequence.browsers = [];
        for (let browser of settings.browsers) {
            sequence.browsers.push(Object.create(browser));
        }
        for (let browser of sequence.browsers) {
            browser.actions = Object.assign([], sequence.recordedActions);

            for (let i: number = 0; i < browser.numberIterations; i++) {
                await this.run(browser, settings);
            }
        }
    }

    public async runAllSequences(project: Project, settings: Settings): Promise<void> {
        for (let sequence of project.sequences) {
            await this.runAllBrowsers(sequence, settings);
        }
    }
}
