import { Injectable } from "@angular/core";
import { Sequence } from "../model/sequence";
import { ActionFactory } from "./action.factory";
import { TestFactory } from "./test.factory";

@Injectable()
export class SequenceFactory {

    constructor(private actionFactory: ActionFactory, private testFactory: TestFactory) { }

    public fromAny(sequence: any): Sequence {
        let newSequence: Sequence = new Sequence(sequence.name);
        if (sequence.actions) {
            for (let action of sequence.actions) {
                newSequence.actions.push(this.actionFactory.fromAny(action));
            }
        }
        if (sequence.tests) {
            for (let test of sequence.tests) {
                newSequence.tests.push(this.testFactory.fromAny(test));
            }
        }
        return newSequence;
    }
}