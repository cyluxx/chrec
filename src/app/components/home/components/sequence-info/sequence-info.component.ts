import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Sequence } from "../../../../model/sequence";
import { Action } from "../../../../model/action";

@Component({
    selector: 'sequence-info',
    templateUrl: './sequence-info.component.html'
})
export class SequenceInfoComponent {

    @Input() sequence: Sequence;

    @Output() closeEmitter = new EventEmitter<void>();

    @Output() recordSequenceEmitter = new EventEmitter<Sequence>();

    @Output() rerecordSequenceEmitter = new EventEmitter<Sequence>();

    currentAction: Action;

    constructor() {
        this.currentAction = null;
    }

    public onAction(action: Action): void {
        this.currentAction = action;
    }

    public onForward(): void {
        if (this.currentAction == null && this.sequence.actions.length > 0) {
            this.currentAction = this.sequence.actions[0];
            return;
        }
    }

    public onBackward(): void {
        if (this.currentAction == null && this.sequence.actions.length > 0) {
            this.currentAction = this.sequence.actions[this.sequence.actions.length - 1];
            return;
        }
    }

    public onRecordSequence(): void {
        this.recordSequenceEmitter.emit(this.sequence);
    }

    public onRerecordSequence(): void {
        this.rerecordSequenceEmitter.emit(this.sequence);
    }
}