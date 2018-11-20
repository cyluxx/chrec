export class Browser {
    type: Type;
    width: number;
    height: number;
    headless: boolean;
}

export enum Type {
    chrome = 'chrome',
    firefox = 'firefox'
}