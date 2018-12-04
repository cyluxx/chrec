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
    selectors: string[];
    boundingBox: DOMRect;

    constructor(image: string, selectors: string[], boundingBox: DOMRect) {
        super(image);
        this.selectors = selectors;
        this.boundingBox = boundingBox;
    }

    public async findElement(driver: WebDriver): Promise<WebElement> {
        return await driver.findElement(By.css(this.selectors[0]));
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
        console.log('%c' + this.name, 'color: #42ff42; font-weight: bold');
    }
}

export class Forward extends Action {
    constructor(image: string) {
        super(image);
        this.name = Name.Forward;
    }

    public run(driver: WebDriver): void {
        driver.navigate().forward();
        console.log('%c' + this.name, 'color: #42ff42; font-weight: bold');
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
        console.log('%c' + this.name, 'color: #42ff42; font-weight: bold');
    }
}

export class Refresh extends Action {
    constructor(image: string) {
        super(image);
        this.name = Name.Refresh;
    }

    public run(driver: WebDriver): void {
        driver.navigate().refresh();
        console.log('%c' + this.name, 'color: #42ff42; font-weight: bold');
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
            console.log('%c' + this.name, 'color: #42ff42; font-weight: bold');
        }
        catch (error) {
            console.log('%c Model Click Error!', 'color: #ff4242; font-weight: bold');
            console.log(error);
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
                console.log('%c Element does not contain selected String.', 'color: #36f9c2; font-weight: bold');
                throw new Error('Element does not contain selected String.');
            }
            console.log('%c' + this.name, 'color: #42ff42; font-weight: bold');
        }
        catch (error) {
            console.log('%c Model Read Error!', 'color: #ff4242; font-weight: bold');
            console.log(error);
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
            console.log('%c' + this.name, 'color: #42ff42; font-weight: bold');
        }
        catch (error) {
            console.log('%c Model Type Error!', 'color: #ff4242; font-weight: bold');
            console.log(error);
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
    Click = 'Click',
    Read = 'Read',
    Type = 'Type'
}