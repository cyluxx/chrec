import { Component, Output, EventEmitter, Input, OnInit } from "@angular/core";
import { Sequence } from "../../../../model/sequence";
import { Settings } from "../../../../model/settings";
import { Action } from "../../../../model/action";

@Component({
    selector: 'rerecord-sequence',
    templateUrl: './rerecord-sequence.component.html'
})
export class RerecordSequenceComponent implements OnInit {

    @Input() sequence: Sequence;

    @Input() settings: Settings;

    @Output() cancleEmitter: EventEmitter<void> = new EventEmitter<void>();

    @Output() submitEmitter: EventEmitter<void> = new EventEmitter<void>();

    currentAction: Action;

    newSequence: Sequence;

    public ngOnInit(): void {
        this.newSequence = new Sequence();
        this.newSequence.name = this.sequence.name;
        this.newSequence.actions = [];

        this.currentAction = this.sequence.actions[0];
    }

    public onCancle(): void {
        this.cancleEmitter.emit();
    }

    public onSubmit(): void {
        this.sequence.actions = this.newSequence.actions;
        this.sequence.executable = false;
        this.submitEmitter.emit();
    }

    public onNextAction(): void {
        if (this.sequence.actions.length > this.newSequence.actions.length) {
            this.currentAction = this.sequence.actions[this.newSequence.actions.length];
        }
        else {
            this.currentAction = null;
        }
    }
}