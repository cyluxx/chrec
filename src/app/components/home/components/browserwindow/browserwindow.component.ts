import { Component, ViewChild, AfterViewInit, Output, EventEmitter } from "@angular/core";
import { WebviewTag } from "electron";
import * as path from 'path';

@Component({
  selector: "browserwindow",
  templateUrl: "./browserwindow.component.html",
  styleUrls: ["./browserwindow.component.scss"]
})
export class BrowserwindowComponent implements AfterViewInit {
  preloadScriptPath: string;

  @ViewChild("webview") tag: any;
  webview: WebviewTag;

  inputUrl: String;
  webviewUrl: String;

  @Output() clickedElement = new EventEmitter<String>();

  constructor() {
    this.webviewUrl = this.inputUrl = "https://www.google.com";
    this.preloadScriptPath = path.resolve(__dirname, '../../../../../../webview-preload.js'); //TODO resolve path hell
  }

  ngAfterViewInit(): void {
    this.webview = (this.tag.nativeElement) as WebviewTag;
    this.webview.addEventListener("dom-ready", () => {
      this.webview.addEventListener('ipc-message', (e) => {
        console.log(e.channel);
        this.clickedElement.emit(e.channel);
      });
      console.log('sending ping...');
      this.webview.send('ping');
      this.webview.openDevTools();
    });
  }

  canGoBack(): boolean {
    return this.webview.canGoBack();
  }

  onBack(): void {
    if (this.canGoBack) {
      this.webview.goBack();
      this.webview.addEventListener("dom-ready", () => {
        this.inputUrl = this.webview.getURL();
      });
    }
  }

  canGoForward(): boolean {
    return this.webview.canGoForward();
  }

  onForward(): void {
    if (this.canGoForward) {
      this.webview.goForward();
      this.webview.addEventListener("dom-ready", () => {
        this.inputUrl = this.webview.getURL();
      });
    }
  }

  onReload(): void {
    this.webview.reload();
    this.inputUrl = this.webviewUrl;
  }

  onUpdateWebviewUrl(): void {
    let https: String = this.inputUrl.slice(0, 8).toLowerCase();
    let http: String = this.inputUrl.slice(0, 7).toLowerCase();
    if (https === "https://" || http === "http://") {
      this.webviewUrl = this.inputUrl;
    } else {
      this.webviewUrl = this.inputUrl = "https://" + this.inputUrl;
    }
  }
}
