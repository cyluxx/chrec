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
    //strings should be equal to fontawesome icon names
    chrome = 'chrome',
    firefox = 'firefox',
    edge = 'edge',
    internetExplorer = 'internet-explorer'
}