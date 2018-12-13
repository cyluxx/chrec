import { Injectable } from "@angular/core";
import { Sequence } from "../model/sequence";
import { ActionFactory } from "./action.factory";
import { BrowserFactory } from "./browser.factory";

@Injectable()
export class SequenceFactory {

    private actionFactory: ActionFactory;
    private browserFactory: BrowserFactory;

    constructor(actionFactory: ActionFactory, browserFactory: BrowserFactory){
        this.actionFactory = actionFactory;
        this.browserFactory = browserFactory;
    }

    public fromAny(sequence: any): Sequence {
        let newSequence: Sequence = new Sequence(sequence.name);

        if (sequence.recordedActions) {
            for (let action of sequence.recordedActions) {
                newSequence.recordedActions.push(this.actionFactory.fromAny(action));
            }
        }

        if (sequence.browsers) {
            for (let browser of sequence.browsers) {
                newSequence.browsers.push(this.browserFactory.fromAny(browser));
            }
        }

        newSequence.executable = sequence.executable;
        newSequence.tested = sequence.tested;
        return newSequence;
    }
}