import { Component, Output, EventEmitter, ViewChild, Input, AfterViewInit } from "@angular/core";
import { Action, Type } from "../../../../model/action";
import * as path from 'path';
import { WebviewTag } from "electron";
import { RecorderState } from "../../../../model/recorder-state";

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

  @Output() actionEmitter = new EventEmitter<Action>();

  constructor() {
    this.preloadScriptPath = path.resolve(__dirname, '../../../../../../webview-preload.js'); //TODO resolve path hell
    this.inputUrl = "";
  }

  ngAfterViewInit(): void {
    this.webview = (this.tag.nativeElement) as WebviewTag;
    this.webview.addEventListener("dom-ready", () => {
      this.inputUrl = this.webview.getURL();
    });
  }

  canGoBack(): boolean {
    return this.webview.canGoBack();
  }

  onBack(): void {
    if (this.canGoBack) {
      this.webview.goBack();
      if (this.recorderState == RecorderState.record) {
        let action: Action = new Action();
        action.type = Type.back;
        action.url = this.webview.getURL();
        this.actionEmitter.emit(action);
      }
    }
  }

  canGoForward(): boolean {
    return this.webview.canGoForward();
  }

  onForward(): void {
    if (this.canGoForward) {
      this.webview.goForward();
      if (this.recorderState == RecorderState.record) {
        let action: Action = new Action();
        action.type = Type.forward;
        action.url = this.webview.getURL();
        this.actionEmitter.emit(action);
      }
    }
  }

  onReload(): void {
    this.webview.reload();
    if (this.recorderState == RecorderState.record) {
      let action: Action = new Action();
      action.type = Type.refresh;
      action.url = this.webview.getURL();
      this.actionEmitter.emit(action);
    }
  }

  onLoadUrl(): void {
    this._autocorrectInputUrl();
    this.webview.loadURL(this.inputUrl);
    if (this.recorderState == RecorderState.record) {
      let action: Action = new Action();
      action.type = Type.goto;
      action.url = this.inputUrl;
      this.actionEmitter.emit(action);
    }
  }

  onAction(action: Action) {
    if (this.recorderState == RecorderState.record) {
      this.actionEmitter.emit(action);
    }
  }

  _autocorrectInputUrl(): void {
    let https: string = this.inputUrl.slice(0, 8).toLowerCase();
    let http: string = this.inputUrl.slice(0, 7).toLowerCase();
    if (https !== "https://" && http !== "http://") {
      this.inputUrl = "https://" + this.inputUrl;
    }
  }
}
