import { Injectable } from '@angular/core';
import { Builder, WebDriver } from 'selenium-webdriver';
import { Browser, Type as BrowserType } from '../model/browser';
import { Sequence } from '../model/sequence';
import { Settings } from '../model/settings';

import * as chrome from 'selenium-webdriver/chrome';
import { Project } from '../model/project';
import { ActionFactory } from '../factory/action.factory';
import { Test } from '../model/test';
import { Action } from '../model/action';
import { BrowserFactory } from '../factory/browser.factory';

@Injectable()
export class WebdriverService {

    constructor(private actionFactory: ActionFactory, private browserFactory: BrowserFactory) { }

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

    public async runBrowser(browser: Browser, settings: Settings): Promise<void> {
        try {
            this.begin(browser, settings.seleniumGridUrl);
            if (browser.actions[0]) {
                await browser.actions[0].run(this.driver);
            }
            for (let i = 1; i < browser.actions.length; i++) {
                if (browser.sleepTimeBetweenActions) {
                    this.driver.sleep(browser.sleepTimeBetweenActions);
                }
                await browser.actions[i].run(this.driver);
            }
            this.quit(browser);
            browser.successfulIterations++;
        }
        catch (error) {
            this.logError(`WebdriverService: Run: Failed to run ${browser.name} - ${browser.type}`);
            this.quit(browser);
            throw new Error(error.message + `\nat Browser ${browser.type}: ${browser.name}`);
        }
    }

    public async runTest(test: Test, actions: Action[], settings: Settings): Promise<void> {
        for (let browser of test.browsers) {
            browser.actions = [];
            for (let action of actions) {
                browser.actions.push(this.actionFactory.fromAction(action));
            }

            for (let i: number = 0; i < browser.numberIterations; i++) {
                try {
                    await this.runBrowser(browser, settings);
                }
                catch (error) {
                    this.logError(`WebdriverService: RunAllBrowsers: Failed to run ${browser.name} - ${browser.type} at iteration ${i}`);
                    throw new Error(error.message + `\nat Iteration ${i}`);
                }
            }
        }
    }

    public async runSequence(sequence: Sequence, settings: Settings): Promise<void> {
        let test: Test = new Test(new Date());
        for (let browser of settings.browsers) {
            test.browsers.push(this.browserFactory.fromBrowser(browser));
        }
        sequence.tests.push(test);
        await this.runTest(test, sequence.actions, settings);
    }

    public async runProject(project: Project, settings: Settings): Promise<void> {
        for (let sequence of project.sequences) {
            await this.runSequence(sequence, settings);
        }
    }

    private logError(message: string): void {
        console.log('%c' + message, 'color: #ff4242; font-weight: bold');
    }
}
