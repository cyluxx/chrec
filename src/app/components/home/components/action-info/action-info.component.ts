import { Component, Input } from "@angular/core";
import { Action, GoTo, Read, Type, HtmlElementAction } from "../../../../model/action";

@Component({
    selector: 'action-info',
    templateUrl: './action-info.component.html'
})
export class ActionInfoComponent{
    @Input() action: Action;

    edit: boolean;

    public isGoTo(action: Action): boolean {
        console.log('isGoTo: ' + action.constructor.name);
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
}