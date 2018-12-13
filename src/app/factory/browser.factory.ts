import { Injectable } from "@angular/core";
import { Browser } from "../model/browser";
import { ActionFactory } from "./action.factory";

@Injectable()
export class BrowserFactory {

    private actionFactory: ActionFactory;

    constructor(actionFactory: ActionFactory){
        this.actionFactory = actionFactory;
    }

    public fromAny(browser: any): Browser {
        let newBrowser: Browser = new Browser();

        if (browser.actions) {
            for (let action of browser.actions) {
                newBrowser.actions.push(this.actionFactory.fromAny(action));
            }
        }
        
        newBrowser.name = browser.name;
        newBrowser.type = browser.type;
        newBrowser.width = browser.width;
        newBrowser.height = browser.height;
        newBrowser.headless = browser.headless;
        newBrowser.numberIterations = browser.numberIterations;
        newBrowser.successfulIterations = browser.successfulIterations;
        newBrowser.sleepTimeBetweenActions = browser.sleepTimeBetweenActions;
        return newBrowser;
    }
}