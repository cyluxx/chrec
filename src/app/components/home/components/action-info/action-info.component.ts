import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Action } from "../../../../model/action";
import { ScreenshotService } from "../../../../providers/screenshot.service";

@Component({
    selector: 'action-info',
    templateUrl: './action-info.component.html'
})
export class ActionInfoComponent implements OnInit{

    screenshotService: ScreenshotService;

    @Input() action: Action;

    @Output() closeEmitter = new EventEmitter<boolean>();

    imgUrl: string;

    constructor(screenshotService: ScreenshotService) {
        this.screenshotService = screenshotService;
        this.action = new Action();
        this.imgUrl = '../../../../assets/background.jpg';
        //this.imgUrl = '../../../../../../screenshots/generated/' + this.action.id + '.png';
    }

    ngOnInit(): void {
        /* this.screenshotService.getScreenshot('./screenshots/generated/' + this.action.id + '.png')
          .then((data: string) => {
            this.imgUrl = data;
          }); */
      }

    onClose(): void {
        this.closeEmitter.emit(true);
    }
}