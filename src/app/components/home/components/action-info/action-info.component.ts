import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { Action } from "../../../../model/action";
import * as opencv from 'opencv4nodejs';
import { nativeImage } from "electron";

@Component({
    selector: 'action-info',
    templateUrl: './action-info.component.html'
})
export class ActionInfoComponent implements AfterViewInit{
    @ViewChild("canvas") canvasRef: ElementRef;

    @Input() action: Action;

    @Output() closeEmitter = new EventEmitter<boolean>();

    imgUrl: string;

    constructor() {
        this.action = new Action();
    }

    public ngAfterViewInit(): void {
        if (this.action.image) {
            let mat = opencv.imdecode(nativeImage.createFromDataURL(this.action.image).toBitmap());
        }
    }

    public onClose(): void {
        this.closeEmitter.emit(true);
    }
}