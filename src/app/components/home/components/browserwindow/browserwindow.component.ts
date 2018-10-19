import { Component, Output, EventEmitter, ViewChild, Input, AfterViewInit } from "@angular/core";
import { Action, Type } from "../../../../model/action";
import * as path from 'path';
import { WebviewTag, NativeImage } from "electron";
import { RecorderState } from "../../../../model/recorder-state";
import { Settings } from "../../../../model/settings";

@Component({
  selector: "browserwindow",
  templateUrl: "./browserwindow.component.html",
  styleUrls: ["./browserwindow.component.scss"]
})
export class BrowserwindowComponent implements AfterViewInit {
  @ViewChild("webview") tag: any;
  webview: WebviewTag;

  preloadScriptPath: string;
  inputUrl: string;

  @Input() recorderState: RecorderState;

  @Input() settings: Settings;

  @Output() actionEmitter = new EventEmitter<Action>();

  constructor() {
    this.preloadScriptPath = path.resolve(__dirname, '../../../../../../webview-preload.js'); //TODO resolve path hell
    this.inputUrl = "";
  }

  public ngAfterViewInit(): void {
    this.webview = (this.tag.nativeElement) as WebviewTag;
    this.webview.addEventListener('dom-ready', () => {
      this.inputUrl = this.webview.getURL();
    });
  }

  public canGoBack(): boolean {
    return this.webview.canGoBack();
  }

  public onBack(): void {
    if (this.canGoBack) {
      if (this.isRecording()) {
        this.webview.capturePage((image: NativeImage) => {
          let action: Action = new Action();
          action.image = image.toDataURL();
          action.type = Type.back;
          action.url = this.webview.getURL();
          this.actionEmitter.emit(action);
        });
      }
      this.webview.goBack();
    }
  }

  public canGoForward(): boolean {
    return this.webview.canGoForward();
  }

  public onForward(): void {
    if (this.canGoForward) {
      if (this.isRecording()) {
        this.webview.capturePage((image: NativeImage) => {
          let action: Action = new Action();
          action.image = image.toDataURL();
          action.type = Type.forward;
          action.url = this.webview.getURL();
          this.actionEmitter.emit(action);
        });
      }
      this.webview.goForward();
    }
  }

  public onReload(): void {
    if (this.isRecording()) {
      this.webview.capturePage((image: NativeImage) => {
        let action: Action = new Action();
        action.image = image.toDataURL();
        action.type = Type.refresh;
        action.url = this.webview.getURL();
        this.actionEmitter.emit(action);
      });
    }
    this.webview.reload();
  }

  public onLoadUrl(): void {
    this.autocorrectInputUrl();
    if (this.isRecording()) {
      this.webview.capturePage((image: NativeImage) => {
        let action: Action = new Action();
        action.image = image.toDataURL();
        action.type = Type.goto;
        action.url = this.inputUrl;
        this.actionEmitter.emit(action);
      });
    }
    this.webview.loadURL(this.inputUrl);
  }

  public onAction(action: Action) {
    if (this.isRecording()) {
      this.actionEmitter.emit(action);
    }
  }

  private isRecording(): boolean {
    return this.recorderState == RecorderState.record;
  }

  private autocorrectInputUrl(): void {
    let https: string = this.inputUrl.slice(0, 8).toLowerCase();
    let http: string = this.inputUrl.slice(0, 7).toLowerCase();
    if (https !== "https://" && http !== "http://") {
      this.inputUrl = "https://" + this.inputUrl;
    }
  }
}
