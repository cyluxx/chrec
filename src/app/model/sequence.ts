import { Action } from "./action";
import { Test } from "./test";

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
}