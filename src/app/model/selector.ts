import { WebDriver, WebElement, By } from "selenium-webdriver";

export class Selector {
    type: Type;
    method: Method;
    value: string;
    executable: boolean;

    constructor(method: Method, value: string) {
        this.method = method;
        this.value = value;

        if (
            this.method === Method.CssSelectorGenerator
            || this.method === Method.Finder
            || this.method === Method.GetQuerySelector
            || this.method === Method.OptimalSelect
            || this.method === Method.SelectorQuery
        ) {

            this.type = Type.Css;
        }
        else {
            this.type = Type.XPath;
        }
    }

    public async test(driver: WebDriver): Promise<void> {
        try {
            if (this.type === Type.Css) {
                await driver.findElement(By.css(this.value));
            }
            else {
                await driver.findElement(By.xpath(this.value));
            }
            this.executable = true;
            this.logSuccess('Chosen Selector ' + this.method + ': ' + this.value + ' valid!');
        }
        catch (error) {
            if (error.name === 'NoSuchElementError') {
                this.executable = false;
                this.logError('Chosen Selector ' + this.method + ': ' + this.value + ' not valid! Trying next one...');
            }
            else {
                throw new Error(error);
            }
        }
    }

    public async findElement(driver: WebDriver): Promise<WebElement> {
        try {
            if (this.type === Type.Css) {
                return await driver.findElement(By.css(this.value));
            }
            else {
                return await driver.findElement(By.xpath(this.value));
            }
        }
        catch (error) {
            this.logError('Chosen Selector ' + this.method + ': ' + this.value + ' not found!');
            throw new Error(error);
        }
    }

    private logSuccess(message: string): void {
        console.log('%c' + message, 'color: #42ff42; font-weight: bold');
    }

    private logError(message: string): void {
        console.log('%c' + message, 'color: #ff4242; font-weight: bold');
    }
}

export enum Type {
    XPath = 'XPath',
    Css = 'CSS'
}

export enum Method {
    CssSelectorGenerator = 'CssSelectorGenerator',
    Finder = 'Finder',
    GetQuerySelector = 'GetQuerySelector',
    OptimalSelect = 'OptimalSelect',
    SelectorQuery = 'SelectorQuery'
}