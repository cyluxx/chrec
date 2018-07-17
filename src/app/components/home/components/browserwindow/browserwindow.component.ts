import { Component, ViewChild, AfterViewInit } from "@angular/core";

@Component({
    selector: 'browserwindow',
    templateUrl: './browserwindow.component.html',
    styleUrls: ['./browserwindow.component.scss']
})
export class BrowserwindowComponent implements AfterViewInit {
    @ViewChild('webview') webview: any;

    url: String;

    constructor() { 
        this.url = 'https://www.google.com'
    }

    ngAfterViewInit(): void {
        this.webview = this.webview.nativeElement;
    }

    canGoBack(): boolean {
        return this.webview.canGoBack();
    }

    onBack(): void {
        if (this.canGoBack) {
            this.webview.goBack();
        }
    }

    canGoForward(): boolean {
        return this.webview.canGoForward();
    }

    onForward(): void {
        if (this.canGoForward) {
            this.webview.goForward();
        }
    }

    onReload(): void {
        this.webview.reload();
    }

    onUpdateWebView(): void {
        let https: String = this.url.slice(0, 8).toLowerCase();
        let http: String = this.url.slice(0, 7).toLowerCase();
        if (https === 'https://') {
            this.webview.loadURL(this.url);
        } else if (http === 'http://') {
            this.webview.loadURL(this.url);
        } else {
            this.webview.loadURL('https://' + this.url);
        }
    }
}