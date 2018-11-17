import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Sequence } from "../../../../model/sequence";
import { Action } from "../../../../model/action";
import { WebdriverService } from "../../../../providers/webdriver.service";
import { Settings } from "../../../../model/settings";

@Component({
    selector: 'sequence-info',
    templateUrl: './sequence-info.component.html'
})
export class SequenceInfoComponent {

    webdriverService: WebdriverService;

    @Input() sequence: Sequence;

    @Input() settings: Settings;

    @Output() closeEmitter = new EventEmitter<void>();

    @Output() recordSequenceEmitter = new EventEmitter<Sequence>();

    @Output() rerecordSequenceEmitter = new EventEmitter<Sequence>();

    currentAction: Action;

    currentActionIndex: number;

    constructor(webdriverService: WebdriverService) {
        this.webdriverService = webdriverService;
    }

    public onRecordSequence(): void {
        this.recordSequenceEmitter.emit(this.sequence);
    }

    public onRerecordSequence(): void {
        this.rerecordSequenceEmitter.emit(this.sequence);
    }

    public onAction(action: Action): void {
        this.currentAction = action;
    }

    public onForward(): void {
        if (this.currentAction == null && this.sequence.actions.length > 0) {
            this.currentActionIndex = 0;
        }
        else {
            this.currentActionIndex++;
            if (this.currentActionIndex > this.sequence.actions.length - 1) {
                this.currentActionIndex = 0;
            }
        }
        this.currentAction = this.sequence.actions[this.currentActionIndex];
    }

    public onBackward(): void {
        if (this.currentAction == null && this.sequence.actions.length > 0) {
            this.currentActionIndex = this.sequence.actions.length - 1;
        }
        else {
            this.currentActionIndex--;
            if (this.currentActionIndex < 0) {
                this.currentActionIndex = this.sequence.actions.length - 1;
            }
        }
        this.currentAction = this.sequence.actions[this.currentActionIndex];
    }

    public async onPlay(): Promise<void> {
        try {
            await this.webdriverService.run(this.sequence, this.settings);
            this.sequence.executable = true;
        }
        catch (error) {
            if (error.name === 'NoSuchElementError') {
                this.sequence.executable = false;
            }
        }
    }
}