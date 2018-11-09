import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { Action } from "../../../../model/action";
import { nativeImage } from "electron";
import { Mat } from "opencv4nodejs";

@Component({
    selector: 'action-info',
    templateUrl: './action-info.component.html'
})
export class ActionInfoComponent implements AfterViewInit{
    @ViewChild("canvas") canvasRef: ElementRef;

    @Input() action: Action;

    constructor() {
        this.action = new Action();
    }

    public ngAfterViewInit(): void {
        // if (this.action.image) {
        //     console.log('test1');
        //     let mat: Mat = opencv.imdecode(nativeImage.createFromDataURL(this.action.image).toBitmap());
        //     console.log('test2');
        //     opencv.imshow('canvas', mat);
        //     console.log('test3');
        // }
    }
}