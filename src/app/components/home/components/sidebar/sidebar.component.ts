import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Sequence } from "../../../../model/sequence";
import { Action } from "../../../../model/action";

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    @Input() currentSequence: Sequence;

    @Output() actionEmitter = new EventEmitter<Action>();

    onAction(action: Action): void {
        this.actionEmitter.emit(action);
    }
}