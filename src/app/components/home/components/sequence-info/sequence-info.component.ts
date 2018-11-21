import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
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

    @Input() currentAction: Action;

    @Output() recordSequenceEmitter = new EventEmitter<Sequence>();

    @Output() rerecordSequenceEmitter = new EventEmitter<Sequence>();

    currentActionIndex: number = 0;

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
        for(let i = 0; i < this.sequence.actions.length; i++){
            if(this.sequence.actions[i] === action){
                this.currentActionIndex = i;
                break;
            }
        }
        this.currentAction = action;
    }

    public onForward(): void {
        this.currentActionIndex++;
        if (this.currentActionIndex > this.sequence.actions.length - 1) {
            this.currentActionIndex = 0;
        }
        this.currentAction = this.sequence.actions[this.currentActionIndex];
    }

    public onBackward(): void {
        this.currentActionIndex--;
        if (this.currentActionIndex < 0) {
            this.currentActionIndex = this.sequence.actions.length - 1;
        }
        this.currentAction = this.sequence.actions[this.currentActionIndex];
    }

    public async onPlay(): Promise<void> {
        this.sequence.tested = true;
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