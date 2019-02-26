import { Injectable } from "@angular/core";
import { Test } from "../model/test";
import { Browser } from "../model/browser";
import { BrowserFactory } from "./browser.factory";

@Injectable()
export class TestFactory {

    constructor(private browserFactory: BrowserFactory) { }

    public fromAny(test: any): Test {
        let newTest: Test = new Test(test.date);
        let browsers: Browser[] = [];
        if (test.browsers) {
            for (let browser of test.browsers) {
                browsers.push(this.browserFactory.fromAny(browser));
            }
        }
        newTest.browsers = browsers;
        return newTest;
    }
}