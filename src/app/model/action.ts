import { Key, WebDriver, WebElement } from 'selenium-webdriver';
import { Selector } from './selector';

export abstract class Action {
    id: string;

    //The name of the Class (for JSON storage). 
    name: string;

    image: string;

    constructor(image: string) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.image = image;
    }

    public abstract run(driver: WebDriver): void;

    protected logCurrent(): void {
        console.log('%c' + this.id + ': ' + this.name, 'color: #733CA3; font-weight: bold');
    }

    protected logCouldNotReplicate(): void {
        console.log('%cCould not replicate ' + this.name + ' Action ' + this.id + '!', 'color: #ff4242; font-weight: bold');
    }

    protected logError(message: string): void {
        console.log('%c' + message, 'color: #ff4242; font-weight: bold');
    }
}

export abstract class HtmlElementAction extends Action {
    chosenSelector: Selector;
    selectors: Selector[];
    boundingBox: DOMRect;

    constructor(image: string, selectors: Selector[], boundingBox: DOMRect) {
        super(image);
        this.selectors = selectors;
        this.boundingBox = boundingBox;
    }

    public async testSelectors(driver: WebDriver): Promise<void> {
        try {
            for (let selector of this.selectors) {
                await selector.test(driver);
            }
        }
        catch(error){
            this.logError('HtmlElementAction testSelectors: No valid Selectors!');
            throw new Error(error);
        }
    }

    public async findElement(driver: WebDriver): Promise<WebElement> {
        await this.testSelectors(driver);

        let candidates: Selector[] = [];
        for (let selector of this.selectors) {
            if (selector.executable) {
                candidates.push(selector);
            }
        }
        try {
            if (candidates && candidates !== []) {
                //get random selector candidate
                let candidate: Selector = candidates[Math.floor(Math.random() * candidates.length)];
                this.chosenSelector = candidate;
                return await candidate.findElement(driver);
            }
        }
        catch (error) {
            this.logError('HtmlElementAction findElement: No valid selector candidates!');
            throw new Error(error);
        }
    }

    public abstract async run(driver: WebDriver): Promise<void>;
}

//Actions
export class Back extends Action {
    constructor(image: string) {
        super(image);
        this.name = Name.Back;
    }

    public run(driver: WebDriver): void {
        driver.navigate().back();
        this.logCurrent();
    }
}

export class Forward extends Action {
    constructor(image: string) {
        super(image);
        this.name = Name.Forward;
    }

    public run(driver: WebDriver): void {
        driver.navigate().forward();
        this.logCurrent();
    }
}

export class GoTo extends Action {
    url: string;

    constructor(image: string, url: string) {
        super(image);
        this.name = Name.GoTo;
        this.url = url;
    }

    public run(driver: WebDriver): void {
        driver.get(this.url);
        this.logCurrent();
    }
}

export class Refresh extends Action {
    constructor(image: string) {
        super(image);
        this.name = Name.Refresh;
    }

    public run(driver: WebDriver): void {
        driver.navigate().refresh();
        this.logCurrent();
    }
}

//HtmlElementActions
export class Click extends HtmlElementAction {
    constructor(image: string, selectors: Selector[], boundingBox: DOMRect) {
        super(image, selectors, boundingBox);
        this.name = Name.Click;
    }

    public async run(driver: WebDriver): Promise<void> {
        try {
            let webElement: WebElement = await this.findElement(driver);
            webElement.click();
            this.logCurrent();
        }
        catch (error) {
            this.logCouldNotReplicate();
            throw new Error(error);
        }
    }
}

export class Read extends HtmlElementAction {
    value: string;

    constructor(image: string, selectors: Selector[], boundingBox: DOMRect, value: string) {
        super(image, selectors, boundingBox);
        this.value = value;
        this.name = Name.Read;
    }

    public async run(driver: WebDriver): Promise<void> {
        try {
            let webElement: WebElement = await this.findElement(driver);
            let text: string = await webElement.getText();
            if (!text.includes(this.value)) {
                console.log('%cElement does not contain selected String.', 'color: #36f9c2; font-weight: bold');
                throw new Error('Element does not contain selected String.');
            }
            this.logCurrent();
        }
        catch (error) {
            this.logCouldNotReplicate();
            throw new Error(error);
        }
    }
}

export class Type extends HtmlElementAction {
    value: string;
    key: string;

    constructor(image: string, selectors: Selector[], boundingBox: DOMRect, value: string, key: string) {
        super(image, selectors, boundingBox);
        this.value = value;
        this.key = key;
        this.name = Name.Type;
    }

    public async run(driver: WebDriver): Promise<void> {
        try {
            console.log('booyaka');
            let webElement: WebElement = await this.findElement(driver);
            webElement.sendKeys(this.value, Key.TAB);
            this.logCurrent();
        }
        catch (error) {
            this.logCouldNotReplicate();
            throw new Error(error);
        }
    }
}

export enum Name {
    //Actions
    Back = 'Back',
    Forward = 'Forward',
    GoTo = 'GoTo',
    Refresh = 'Refresh',

    //HtmlElementActions
    Change = 'Change',
    Click = 'Click',
    Read = 'Read',
    Type = 'Type'
}