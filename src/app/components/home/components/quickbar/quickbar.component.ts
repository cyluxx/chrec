import { Component, Input, EventEmitter, Output } from "@angular/core";
import { WebdriverService } from "../../../../providers/webdriver.service";
import { Action, Type } from "../../../../model/action";
import { RecorderState } from "../../../../model/recorder-state";
import { Sequence } from "../../../../model/sequence";
import { Settings } from "../../../../model/settings";

@Component({
    selector: 'quickbar',
    templateUrl: './quickbar.component.html'
})
export class QuickbarComponent {
    webdriverService: WebdriverService;
    recorderState: RecorderState;

    screenshotFilename: string;

    @Input()
    sequences: Sequence[];

    @Input()
    currentSequence: Sequence;

    @Input()
    settings: Settings;

    @Output() recorderStateEmitter = new EventEmitter<RecorderState>();

    @Output() saveEmitter = new EventEmitter<boolean>();

    @Output() clearProjectsEmitter = new EventEmitter<boolean>();

    constructor(webdriverService: WebdriverService) {
        this.webdriverService = webdriverService;
        this.recorderState = RecorderState.stop;

        this.sequences = [];
    }

    onRecord() {
        if (this.currentSequence.name) {
            this.recorderState = RecorderState.record;
            this.recorderStateEmitter.emit(this.recorderState);
        }
    }

    public async onPlay(): Promise<void> {
        this.recorderState = RecorderState.play;
        this.recorderStateEmitter.emit(this.recorderState);
        await this.playSequence(this.currentSequence);
        this.recorderState = RecorderState.stop;
        this.recorderStateEmitter.emit(this.recorderState);
    }
    
    public async onPlayAll(): Promise<void> {
        this.recorderState = RecorderState.play;
        this.recorderStateEmitter.emit(this.recorderState);
        for(let sequence of this.sequences){
            await this.playSequence(sequence);
        }
        this.recorderState = RecorderState.stop;
        this.recorderStateEmitter.emit(this.recorderState);
    }
    
    private async playSequence(sequence: Sequence): Promise<void> {
        try {
            await this.webdriverService.run(sequence, this.settings);
            this.currentSequence.executable = true;
        }
        catch (error) {
            if (error.name === 'NoSuchElementError') {
                sequence.executable = false;
            }
        }
    }

    onSave() {
        this.saveEmitter.emit(true);
    }

    onStop() {
        this.recorderState = RecorderState.stop;
        this.recorderStateEmitter.emit(this.recorderState);
    }

    onScreenshot() {
        if (this.recorderState == RecorderState.record) {
            let screenshotAction: Action = new Action();
            screenshotAction.type = Type.screenshot;
            if (this.screenshotFilename) {
                this._autocorrectScreenshotFilename();
                screenshotAction.filename = this.screenshotFilename;
            }
            else {
                screenshotAction.filename = 'screenshot';
            }
            this.currentSequence.actions.push(screenshotAction);
        }
    }

    onClearProjects() {
        this.clearProjectsEmitter.emit(true);
    }

    _autocorrectScreenshotFilename(): void {
        if (!this.screenshotFilename.endsWith('.png')) {
            this.screenshotFilename += '.png';
        }
    }
}