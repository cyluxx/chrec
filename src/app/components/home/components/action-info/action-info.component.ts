import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Action } from "../../../../model/action";

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
        //this.imgUrl = require('../../../../assets/background.png');
        //this.imgUrl = '../../../../../../screenshots/generated/' + this.action.id + '.png';
    }

    onClose(): void {
        this.closeEmitter.emit(true);
    }
}