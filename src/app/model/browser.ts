export class Browser {
    type: Type;
    width: number;
    height: number;
    headless: boolean;
    numberIterations: number;
    sleepTimeBetweenActions: number; 
}

export enum Type {
    chrome = 'chrome',
    firefox = 'firefox'
}