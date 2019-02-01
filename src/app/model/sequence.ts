import { Action, HtmlElementAction } from "./action";
import { Test } from "./test";
import { Browser } from "./browser";
import { Selector } from "./selector";

export class Sequence {
    name: string;
    actions: Action[];
    tests: Test[];

    constructor(name: string) {
        this.actions = [];
        this.tests = [];
        this.name = name;
    }

    public isTested(): boolean {
        return this.tests.length > 0;
    }

    public isExecutable(): boolean {
        return this.isTested() && this.tests[this.tests.length - 1].isExecutable();
    }

    //TODO refactor this
    public sumAllExecutableIterations(): void {
        if (this.tests.length <= 0) {
            throw new Error('sumAllExecutableIterations: Tests Array Empty');
        }

        for (let sequenceAction of this.actions) {
            if (sequenceAction instanceof HtmlElementAction) {
                sequenceAction.selectors.map(sequenceActionSelector => {
                    for (let browser of this.tests[this.tests.length - 1].browsers) {
                        for (let browserAction of browser.actions) {
                            if (browserAction instanceof HtmlElementAction) {
                                for (let browserActionSelector of browserAction.selectors) {
                                    if (browserActionSelector.method === sequenceActionSelector.method) {
                                        if (browserActionSelector.executableIterations >= browser.numberIterations) {
                                            sequenceActionSelector.executableIterations++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
    }

    public setBestAllTimeSelector(): void {
        if (this.tests.length <= 0) {
            throw new Error('getBestAllTimeSelector: Tests Array Empty');
        }

        this.actions.map(sequenceAction => {
            if (sequenceAction instanceof HtmlElementAction) {
                for (let browser of this.tests[this.tests.length - 1].browsers) {
                    for (let browserAction of browser.actions) {
                        if (browserAction instanceof HtmlElementAction) {
                            let candidates: Selector[] = browserAction.selectors;
                            sequenceAction.bestAllTimeSelector;
                        }
                    }
                }
            }
        });
    }

    public getTotalHTMLElementActionCount(): number {
        return this.tests.reduce((testIterationSum: number, currentTest: Test): number => {
            return currentTest.browsers.reduce((actionCount: number, currentBrowser: Browser): number => {
                return actionCount + currentBrowser.actions.filter(action => action instanceof HtmlElementAction).length;
            }, testIterationSum);
        }, 0);
    }
}