import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { WebviewTag, NativeImage } from 'electron';
import { Settings } from '../../../model/settings';
import { Sequence } from 'chrec-core/lib/model/sequence';
import { Action } from 'chrec-core/lib/model/action/action';
import * as path from 'path';
import { Back } from 'chrec-core/lib/model/action/back';
import { Forward } from 'chrec-core/lib/model/action/forward';
import { GoTo } from 'chrec-core/lib/model/action/go-to';
import { Refresh } from 'chrec-core/lib/model/action/refresh';
import { HtmlElementAction } from 'chrec-core/lib/model/action/html-element-action/html-element-action';

@Component({
  selector: 'app-browser-window',
  templateUrl: './browser-window.component.html',
  styleUrls: ['./browser-window.component.scss']
})
export class BrowserWindowComponent implements AfterViewInit {
  @ViewChild('webview') webviewRef: ElementRef;
  webview: WebviewTag;

  preloadScriptPath: string;
  inputUrl = '';
  info: string;

  @Input() settings: Settings;

  @Input() sequence: Sequence;

  @Output() actionEmitter: EventEmitter<Action> = new EventEmitter<Action>();

  constructor() {
    this.preloadScriptPath = path.resolve(__dirname, '../../../../../../preload-scripts/preload.js'); // TODO resolve path hell
  }

  public ngAfterViewInit(): void {
    this.webview = (this.webviewRef.nativeElement) as WebviewTag;
    this.webview.setAttribute('style', `width:${this.settings.webviewWidth}px; height:${this.settings.webviewHeight}px`);
    this.webview.addEventListener('dom-ready', () => {
      this.inputUrl = this.webview.getURL();
    });

    if (this.sequence.getActions().length === 0 && this.settings.homeUrl) {
      this.sequence.addAction(new GoTo(null, this.settings.homeUrl));
    }
  }

  public canGoBack(): boolean {
    return this.webview.canGoBack();
  }

  public onBack(): void {
    if (this.canGoBack) {
      this.webview.capturePage((nativeImage: NativeImage) => {
        const image: string = nativeImage.toDataURL();
        const action: Action = new Back(image);
        this.sequence.addAction(action);
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
        const image: string = nativeImage.toDataURL();
        const action: Action = new Forward(image);
        this.sequence.addAction(action);
        this.actionEmitter.emit(action);
      });
      this.webview.goForward();
    }
  }

  public onReload(): void {
    this.webview.capturePage((nativeImage: NativeImage) => {
      const image: string = nativeImage.toDataURL();
      const action: Action = new Refresh(image);
      this.sequence.addAction(action);
      this.actionEmitter.emit(action);
    });
    this.webview.reloadIgnoringCache();
  }

  public onLoadUrl(): void {
    this.autocorrectInputUrl();
    this.webview.capturePage((nativeImage: NativeImage) => {
      const image: string = nativeImage.toDataURL();
      const action: Action = new GoTo(image, this.inputUrl);
      this.sequence.addAction(action);
      this.actionEmitter.emit(action);
    });
    this.webview.loadURL(this.inputUrl);
  }

  public onWebviewAction(action: HtmlElementAction) {
    this.sequence.addAction(action);
    this.actionEmitter.emit(action);
    this.info = '';
  }

  public onInfo(info: string) {
    this.info = info;
  }

  private autocorrectInputUrl(): void {
    const https: string = this.inputUrl.slice(0, 8).toLowerCase();
    const http: string = this.inputUrl.slice(0, 7).toLowerCase();
    const localhost: string = this.inputUrl.slice(0, 9).toLowerCase();
    if (https !== 'https://' && http !== 'http://' && localhost !== 'localhost') {
      this.inputUrl = 'https://' + this.inputUrl;
    }
  }
}
