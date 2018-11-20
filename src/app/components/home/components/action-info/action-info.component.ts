import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { Action } from "../../../../model/action";

@Component({
    selector: 'action-info',
    templateUrl: './action-info.component.html'
})
export class ActionInfoComponent{
    @Input() action: Action;

    edit: boolean;

    public onToggleEdit(): void {
        this.edit = !this.edit;
    }
}