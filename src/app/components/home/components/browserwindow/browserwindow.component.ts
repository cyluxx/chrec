import { Component, ViewChild, AfterViewInit, Output, EventEmitter } from "@angular/core";
import { WebviewTag } from "electron";

@Component({
  selector: "browserwindow",
  templateUrl: "./browserwindow.component.html",
  styleUrls: ["./browserwindow.component.scss"]
})
export class BrowserwindowComponent implements AfterViewInit {
  @ViewChild("webview") tag: any;
  webview: WebviewTag;

  inputUrl: String;
  webviewUrl: String;

  @Output() clickedElement = new EventEmitter<String>();

  constructor() {
    this.webviewUrl = this.inputUrl = "https://www.google.com";
  }

  ngAfterViewInit(): void {
    this.webview = (this.tag.nativeElement) as WebviewTag;
    this.webview.addEventListener("dom-ready", () => {
      this.webview.executeJavaScript(
        `
        var cssPath = function(el) {
          if (!(el instanceof Element)) return;
          var path = [];
          while (el.nodeType === Node.ELEMENT_NODE) {
              var selector = el.nodeName.toLowerCase();
              if (el.id) {
                  selector += '#' + el.id;
              } else {
                  var sib = el, nth = 1;
                  while (sib.nodeType === Node.ELEMENT_NODE && (sib = sib.previousSibling) && nth++);
                  selector += ":nth-child("+nth+")";
              }
              path.unshift(selector);
              el = el.parentNode;
          }
          return path.join(" > ");
        }

        document.addEventListener('click', function(e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            console.log(cssPath(target).toString());
        }, false);
        `
      );
    });
    this.webview.addEventListener('console-message', (e) => {
      console.log(e.message);
      if (e.message.slice(0, 5) == 'html:') {
        this.clickedElement.emit(e.message);
      }
    })
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
