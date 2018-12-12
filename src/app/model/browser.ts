import { Action } from "./action";

export class Browser {
    name: string;
    type: Type;
    width: number;
    height: number;
    headless: boolean;
    numberIterations: number;
    successfulIterations: number;
    sleepTimeBetweenActions: number;

    actions: Action[];

    constructor() {
        this.width = 800;
        this.height = 600;
        this.headless = false;
        this.numberIterations = 1;
        this.successfulIterations = 0;
        this.sleepTimeBetweenActions = 0;
        this.actions = [];
    }
}

export enum Type {
    chrome = 'chrome',
    firefox = 'firefox'
}