import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Action } from "../../../../model/action";
import * as opencv from 'opencv4nodejs';

@Component({
    selector: 'action-info',
    templateUrl: './action-info.component.html'
})
export class ActionInfoComponent {

    @Input() action: Action;

    @Output() closeEmitter = new EventEmitter<boolean>();

    imgUrl: string;

    constructor() {
        this.action = new Action();
    }

    ngOnInit(): void {
        if (this.action.image) {
            opencv.imread(this.action.image);
        }
    }

    onClose(): void {
        this.closeEmitter.emit(true);
    }
}