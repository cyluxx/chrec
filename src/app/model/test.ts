import { Browser } from "./browser";

export class Test {
    date: Date;
    browsers: Browser[];

    constructor(date: Date) {
        this.date = date;
        this.browsers = [];
    }

    public isExecutable(): boolean {
        if(this.browsers){
            for(let browser of this.browsers){
                if(browser.successfulIterations < browser.numberIterations){
                    return false;
                }
            }
        }
        return true;
    }
}