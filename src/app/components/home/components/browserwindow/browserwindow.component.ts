import { Component, ViewChild, Input, AfterViewInit, ElementRef, Output, EventEmitter} from "@angular/core";
import { Action, Type } from "../../../../model/action";
import * as path from 'path';
import { WebviewTag, NativeImage } from "electron";
import { Settings } from "../../../../model/settings";
import { Sequence } from "../../../../model/sequence";

@Component({
    selector: "browserwindow",
    templateUrl: "./browserwindow.component.html"
})
export class BrowserwindowComponent implements AfterViewInit {
    @ViewChild("webview") webviewRef: ElementRef;
    webview: WebviewTag;

    preloadScriptPath: string;
    inputUrl: string;

    @Input() settings: Settings;

    @Input() sequence: Sequence;

    @Output() actionEmitter: EventEmitter<Action> = new EventEmitter<Action>();

    constructor() {
        this.preloadScriptPath = path.resolve(__dirname, '../../../../../../preload-scripts/preload.js'); //TODO resolve path hell
        this.inputUrl = "";
    }

    public ngAfterViewInit(): void {
        this.webview = (this.webviewRef.nativeElement) as WebviewTag;
        this.webview.setAttribute('style', `width:${this.settings.webviewWidth}px; height:${this.settings.webviewHeight}px`);
        this.webview.addEventListener('dom-ready', () => {
            this.inputUrl = this.webview.getURL();
        });
    }

    public canGoBack(): boolean {
        return this.webview.canGoBack();
    }

    public onBack(): void {
        if (this.canGoBack) {
            this.webview.capturePage((image: NativeImage) => {
                let action: Action = new Action();
                action.image = image.toDataURL();
                action.type = Type.back;
                action.url = this.webview.getURL();
                this.sequence.actions.push(action);
                this.actionEmitter.emit(action);
            });
            this.webview.goBack();
        }
    }

    public canGoForward(): boolean {
        return this.webview.canGoForward();
    }

    public onForward(): void {
        if (this.canGoForward) {
            this.webview.capturePage((image: NativeImage) => {
                let action: Action = new Action();
                action.image = image.toDataURL();
                action.type = Type.forward;
                action.url = this.webview.getURL();
                this.sequence.actions.push(action);
                this.actionEmitter.emit(action);
            });
            this.webview.goForward();
        }
    }

    public onReload(): void {
        this.webview.capturePage((image: NativeImage) => {
            let action: Action = new Action();
            action.image = image.toDataURL();
            action.type = Type.refresh;
            action.url = this.webview.getURL();
            this.sequence.actions.push(action);
            this.actionEmitter.emit(action);
        });
        this.webview.reloadIgnoringCache();
    }

    public onLoadUrl(): void {
        this.autocorrectInputUrl();
        this.webview.capturePage((image: NativeImage) => {
            let action: Action = new Action();
            action.image = image.toDataURL();
            action.type = Type.goto;
            action.url = this.inputUrl;
            this.sequence.actions.push(action);
            this.actionEmitter.emit(action);
        });
        this.webview.loadURL(this.inputUrl);
    }

    public onAction(action: Action) {
        this.sequence.actions.push(action);
        this.actionEmitter.emit(action);
    }

    private autocorrectInputUrl(): void {
        let https: string = this.inputUrl.slice(0, 8).toLowerCase();
        let http: string = this.inputUrl.slice(0, 7).toLowerCase();
        if (https !== "https://" && http !== "http://") {
            this.inputUrl = "https://" + this.inputUrl;
        }
    }
}
