import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Action } from "../../../../model/action";

@Component({
    selector: 'action-info',
    templateUrl: './action-info.component.html'
})
export class ActionInfoComponent{

    @Input() action: Action;

    @Output() closeEmitter = new EventEmitter<boolean>();

    imgUrl: string;

    constructor() {
        this.action = new Action();
    }

    onClose(): void {
        this.closeEmitter.emit(true);
    }
}