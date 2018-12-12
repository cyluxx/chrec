import { Component, Input } from "@angular/core";
import { Action, GoTo, Read, Type, HtmlElementAction } from "../../../../model/action";
import { Browser } from "../../../../model/browser";

@Component({
    selector: 'action-info',
    templateUrl: './action-info.component.html'
})
export class ActionInfoComponent {
    @Input() action: Action;

    edit: boolean;

    currentBrowser: Browser;

    public isGoTo(action: Action): boolean {
        return action instanceof GoTo;
    }

    public asGoTo(action: Action): GoTo {
        return action as GoTo;
    }

    public isHtmlElementAction(action: Action): boolean {
        return action instanceof HtmlElementAction;
    }

    public asHtmlElementAction(action: Action): HtmlElementAction {
        return action as HtmlElementAction;
    }

    public isRead(action: Action): boolean {
        return action instanceof Read;
    }

    public asRead(action: Action): Read {
        return action as Read;
    }

    public isType(action: Action): boolean {
        return action instanceof Type;
    }

    public asType(action: Action): Type {
        return action as Type;
    }

    public onToggleEdit(): void {
        this.edit = !this.edit;
    }

    public onBrowser(browser: Browser): void {
        this.currentBrowser = browser;
    }

    public getStabilityIndicator(browser: Browser): number {
        return 0;
        //return (browser.successfulIterations / browser.numberIterations + browser.successfulSelectors.length / this.asHtmlElementAction(this.action).selectors.length) / 2 * 100;
    }
}