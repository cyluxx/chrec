import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { SeleniumService } from "../../../../providers/selenium.service";
import { Action, Type } from "../../../../model/action";
import { RecorderState } from "../../../../model/recorder-state";

@Component({
    selector: 'quickbar',
    templateUrl: './quickbar.component.html',
    providers: [SeleniumService],
})
export class QuickbarComponent{
    seleniumService: SeleniumService;
    recorderState: RecorderState;

    screenshotFilename: string;

    @Input()
    actions: Action[];

    @Output() recorderStateEmitter = new EventEmitter<RecorderState>();

    constructor(seleniumService: SeleniumService){
        this.seleniumService = seleniumService;
        this.recorderState = RecorderState.stop;
    }

    onRecord(){
        this.recorderState = RecorderState.record;
        this.recorderStateEmitter.emit(this.recorderState);
    }

    onPlay() {
        this.recorderState = RecorderState.play;
        this.recorderStateEmitter.emit(this.recorderState);
        this.seleniumService.run(this.actions);
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
            this.actions.push(screenshotAction);
        }
    }

    _autocorrectScreenshotFilename(): void {
        if(!this.screenshotFilename.endsWith('.png')){
            this.screenshotFilename += '.png';
        }
    }
}