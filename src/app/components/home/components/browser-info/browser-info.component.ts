import { Component, Input, OnChanges } from "@angular/core";
import { Browser } from "../../../../model/browser";
import { Action, HtmlElementAction } from "../../../../model/action";

@Component({
    selector: 'browser-info',
    templateUrl: './browser-info.component.html',
    styleUrls: ['./browser-info.component.scss']
})
export class BrowserInfoComponent implements OnChanges{

    @Input() browser: Browser;

    currentAction: Action;

    currentActionIndex: number = 0;

    ngOnChanges(): void {
        this.currentAction = this.browser.actions[this.currentActionIndex];
    }

    public onSelectAction(action: Action): void {
        for (let i = 0; i < this.browser.actions.length; i++) {
            if (this.browser.actions[i] === action) {
                this.currentActionIndex = i;
                break;
            }
        }
        this.currentAction = action;
    }

    public onForward(): void {
        this.currentActionIndex++;
        if (this.currentActionIndex > this.browser.actions.length - 1) {
            this.currentActionIndex = 0;
        }
        this.currentAction = this.browser.actions[this.currentActionIndex];
    }

    public onBackward(): void {
        this.currentActionIndex--;
        if (this.currentActionIndex < 0) {
            this.currentActionIndex = this.browser.actions.length - 1;
        }
        this.currentAction = this.browser.actions[this.currentActionIndex];
    }

    public getSuccessfulSelectorCount(): number {
        let count: number = 0;
        for (let action of this.browser.actions) {
            if (action instanceof HtmlElementAction) {
                for (let selector of action.selectors) {
                    if (selector.executableIterations === this.browser.numberIterations) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    public getTotalSelectorCount(): number {
        let count: number = 0;
        for (let action of this.browser.actions) {
            if (action instanceof HtmlElementAction) {
                count += action.selectors.length;
            }
        }
        return count;
    }

    public getStabilityIndicator(): number {
        return Math.round((this.browser.successfulIterations / this.browser.numberIterations + this.getSuccessfulSelectorCount() / this.getTotalSelectorCount()) / 2 * 100);
    }
}