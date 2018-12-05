import { By, Key, WebDriver, WebElement } from 'selenium-webdriver';

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
}

export abstract class HtmlElementAction extends Action {
    chosenSelector: string;
    selectors: string[];
    boundingBox: DOMRect;

    constructor(image: string, selectors: string[], boundingBox: DOMRect) {
        super(image);
        this.selectors = selectors;
        this.boundingBox = boundingBox;
    }

    public async findElement(driver: WebDriver): Promise<WebElement> {
        for (let selector of this.selectors) {
            try {
                this.chosenSelector = selector;
                let webElement: WebElement = await driver.findElement(By.css(selector));
                console.log('%cChosen Selector ' + this.chosenSelector + ' found!', 'color: #42ff42; font-weight: bold');
                return webElement;
            }
            catch (error) {
                if (error.name === 'NoSuchElementError') {
                    console.log('%cChosen Selector ' + this.chosenSelector + ' not found! Trying next one...', 'color: #ff4242; font-weight: bold');
                }
            }
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
        console.log('%c' + this.name, 'color: #733CA3; font-weight: bold');
    }
}

export class Forward extends Action {
    constructor(image: string) {
        super(image);
        this.name = Name.Forward;
    }

    public run(driver: WebDriver): void {
        driver.navigate().forward();
        console.log('%c' + this.name, 'color: #733CA3; font-weight: bold');
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
        console.log('%c' + this.name, 'color: #733CA3; font-weight: bold');
    }
}

export class Refresh extends Action {
    constructor(image: string) {
        super(image);
        this.name = Name.Refresh;
    }

    public run(driver: WebDriver): void {
        driver.navigate().refresh();
        console.log('%c' + this.name, 'color: #733CA3; font-weight: bold');
    }
}

//HtmlElementActions
export class Click extends HtmlElementAction {
    constructor(image: string, selectors: string[], boundingBox: DOMRect) {
        super(image, selectors, boundingBox);
        this.name = Name.Click;
    }

    public async run(driver: WebDriver): Promise<void> {
        try {
            let webElement: WebElement = await this.findElement(driver);
            webElement.click();
            console.log('%c' + this.name, 'color: #733CA3; font-weight: bold');
        }
        catch (error) {
            console.log('%cCould not replicate Click Action ' + this.id + '!', 'color: #ff4242; font-weight: bold');
            throw error;
        }
    }
}

export class Read extends HtmlElementAction {
    value: string;

    constructor(image: string, selectors: string[], boundingBox: DOMRect, value: string) {
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
            console.log('%c' + this.name, 'color: #733CA3; font-weight: bold');
        }
        catch (error) {
            console.log('%cCould not replicate Read Action ' + this.id + '!', 'color: #ff4242; font-weight: bold');
            throw error;
        }
    }
}

export class Type extends HtmlElementAction {
    value: string;
    key: string;

    constructor(image: string, selectors: string[], boundingBox: DOMRect, value: string, key: string) {
        super(image, selectors, boundingBox);
        this.value = value;
        this.key = key;
        this.name = Name.Type;
    }

    public async run(driver: WebDriver): Promise<void> {
        try {
            let webElement: WebElement = await this.findElement(driver);
            webElement.sendKeys(this.value, Key.TAB);
            console.log('%c' + this.name, 'color: #733CA3; font-weight: bold');
        }
        catch (error) {
            console.log('%cCould not replicate Type Action ' + this.id + '!', 'color: #ff4242; font-weight: bold');
            throw error;
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