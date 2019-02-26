import { Component, ViewChild, Input, AfterViewInit, ElementRef, Output, EventEmitter} from "@angular/core";
import { Action, Back, Forward, Refresh, GoTo } from "../../../../model/action";
import * as path from 'path';
import { WebviewTag, NativeImage } from "electron";
import { Settings } from "../../../../model/settings";
import { Sequence } from "../../../../model/sequence";

@Component({
    selector: "browserwindow",
    templateUrl: "./browserwindow.component.html",
    styleUrls: ['./browserwindow.component.scss']
})
export class BrowserwindowComponent implements AfterViewInit {
    @ViewChild("webview") webviewRef: ElementRef;
    webview: WebviewTag;

    preloadScriptPath: string;
    inputUrl: string;
    info: string;

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

        if(this.sequence.actions.length === 0 && this.settings.homeUrl){
            this.sequence.actions.push(new GoTo(null, this.settings.homeUrl));
        }
    }

    public canGoBack(): boolean {
        return this.webview.canGoBack();
    }

    public onBack(): void {
        if (this.canGoBack) {
            this.webview.capturePage((nativeImage: NativeImage) => {
                let image: string = nativeImage.toDataURL();
                let action: Action = new Back(image);
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
            this.webview.capturePage((nativeImage: NativeImage) => {
                let image: string = nativeImage.toDataURL();
                let action: Action = new Forward(image);
                this.sequence.actions.push(action);
                this.actionEmitter.emit(action);
            });
            this.webview.goForward();
        }
    }

    public onReload(): void {
        this.webview.capturePage((nativeImage: NativeImage) => {
            let image: string = nativeImage.toDataURL();
            let action: Action = new Refresh(image);
            this.sequence.actions.push(action);
            this.actionEmitter.emit(action);
        });
        this.webview.reloadIgnoringCache();
    }

    public onLoadUrl(): void {
        this.autocorrectInputUrl();
        this.webview.capturePage((nativeImage: NativeImage) => {
            let image: string = nativeImage.toDataURL();
            let action: Action = new GoTo(image, this.inputUrl);
            this.sequence.actions.push(action);
            this.actionEmitter.emit(action);
        });
        this.webview.loadURL(this.inputUrl);
    }

    public onAction(action: Action) {
        this.sequence.actions.push(action);
        this.actionEmitter.emit(action);
        this.info = '';
    }

    public onInfo(info: string){
        this.info = info;
    }

    private autocorrectInputUrl(): void {
        let https: string = this.inputUrl.slice(0, 8).toLowerCase();
        let http: string = this.inputUrl.slice(0, 7).toLowerCase();
        let localhost: string = this.inputUrl.slice(0, 9).toLowerCase();
        if (https !== "https://" && http !== "http://" && localhost !== 'localhost') {
            this.inputUrl = "https://" + this.inputUrl;
        }
    }
}
