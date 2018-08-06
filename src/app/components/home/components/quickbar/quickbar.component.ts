import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { SeleniumService } from "../../../../providers/selenium.service";
import { Action } from "../../../../model/action";
import { RecorderState } from "../../../../model/recorder-state";

@Component({
    selector: 'quickbar',
    templateUrl: './quickbar.component.html',
    providers: [SeleniumService],
})
export class QuickbarComponent{
    seleniumService: SeleniumService;
    recorderState: RecorderState;

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
}