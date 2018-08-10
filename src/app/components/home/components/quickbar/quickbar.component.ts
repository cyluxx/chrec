import { Component, Input, EventEmitter, Output } from "@angular/core";
import { WebdriverService } from "../../../../providers/webdriver.service";
import { Action, Type } from "../../../../model/action";
import { RecorderState } from "../../../../model/recorder-state";
import { Sequence } from "../../../../model/sequence";

@Component({
    selector: 'quickbar',
    templateUrl: './quickbar.component.html'
})
export class QuickbarComponent{
    webdriverService: WebdriverService;
    recorderState: RecorderState;

    screenshotFilename: string;

    @Input()
    sequence: Sequence;

    @Output() recorderStateEmitter = new EventEmitter<RecorderState>();

    constructor(webdriverService: WebdriverService){
        this.webdriverService = webdriverService;
        this.recorderState = RecorderState.stop;
    }

    onRecord(){
        this.recorderState = RecorderState.record;
        this.recorderStateEmitter.emit(this.recorderState);
    }

    onPlay() {
        this.recorderState = RecorderState.play;
        this.recorderStateEmitter.emit(this.recorderState);
        this.webdriverService.run(this.sequence.actions);
    }

    onStop() {
        this.recorderState = RecorderState.stop;
        this.recorderStateEmitter.emit(this.recorderState);
    }

    onScreenshot() {
        if(this.recorderState == RecorderState.record){
            let screenshotAction: Action = new Action();
            screenshotAction.type = Type.screenshot;
            if(this.screenshotFilename){
                this._autocorrectScreenshotFilename();
                screenshotAction.filename = this.screenshotFilename;
            }
            else{
                screenshotAction.filename = 'screenshot';
            }
            this.sequence.actions.push(screenshotAction);
        }
    }

    _autocorrectScreenshotFilename(): void {
        if(!this.screenshotFilename.endsWith('.png')){
            this.screenshotFilename += '.png';
        }
    }
}