import { Component, Output, EventEmitter, Input, OnInit } from "@angular/core";
import { Sequence } from "../../../../model/sequence";
import { Settings } from "../../../../model/settings";
import { Action, GoTo, Read, Type } from "../../../../model/action";

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

    showBrowserwindow = false;

    public ngOnInit(): void {
        this.newSequence = new Sequence(this.sequence.name);
        this.currentAction = this.sequence.actions[0];
    }

    public onCancle(): void {
        this.cancleEmitter.emit();
    }

    public onSubmit(): void {
        this.sequence.actions = this.newSequence.actions;
        this.submitEmitter.emit();
    }

    public onNextAction(): void {
        if (this.sequence.actions.length > this.newSequence.actions.length) {
            this.currentAction = this.sequence.actions[this.newSequence.actions.length];
        }
        else {
            this.currentAction = null;
        }
        this.showBrowserwindow = false;
    }

    public onConfirm(): void {
        this.showBrowserwindow = true;
    }

    public onBack(): void {
        this.showBrowserwindow = false;
    }

    public isGoTo(action: Action): boolean {
        return action instanceof GoTo;
    }

    public asGoTo(action: Action): GoTo {
        return action as GoTo;
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
}