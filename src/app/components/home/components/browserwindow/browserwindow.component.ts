import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { WebviewTag } from "electron";

@Component({
  selector: "browserwindow",
  templateUrl: "./browserwindow.component.html",
  styleUrls: ["./browserwindow.component.scss"]
})
export class BrowserwindowComponent implements AfterViewInit {
  @ViewChild("webview") webview: any;

  inputUrl: String;
  webviewUrl: String;

  constructor() {
    this.webviewUrl = this.inputUrl = "https://www.google.com";
  }

  ngAfterViewInit(): void {
    this.webview = this.webview.nativeElement;
    this.webview as WebviewTag;
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
