import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Settings } from '../../../model/settings';
import { Sequence } from 'chrec-core/lib/model/sequence';
import { Action } from 'chrec-core/lib/model/action/action';
import * as path from 'path';
import { Back } from 'chrec-core/lib/model/action/back';
import { Forward } from 'chrec-core/lib/model/action/forward';
import { GoTo } from 'chrec-core/lib/model/action/go-to';
import { Refresh } from 'chrec-core/lib/model/action/refresh';
import { HtmlElementAction } from 'chrec-core/lib/model/action/html-element-action/html-element-action';
import { IpcMessageEvent, WebviewTag, NativeImage } from 'electron';
import { ActionService } from '../../../providers/action.service';

@Component({
  selector: 'app-browser-window',
  templateUrl: './browser-window.component.html',
  styleUrls: ['./browser-window.component.scss']
})
export class BrowserWindowComponent implements OnInit, OnDestroy {
  @ViewChild('webview') webviewRef: ElementRef;
  webview: WebviewTag;

  @Input() sequence: Sequence;
  @Input() settings: Settings;

  @Output() actionEmitter: EventEmitter<Action> = new EventEmitter<Action>();

  inputUrl: string;
  preloadScriptPath: string;

  domReadyCallback: () => void;
  ipcMessageEventCallback: (ipcMessageEvent: IpcMessageEvent) => void;

  constructor(private actionService: ActionService) {
    // TODO: resolve path hell and package preload scripts properly
    this.preloadScriptPath = path.resolve(__dirname, '../../../../../../src/assets/preload-scripts/preload.js');
    console.log(this.preloadScriptPath);

    this.domReadyCallback = () => {
      this.webview.getWebContents().session.clearCache(function () {
        console.log('Cleared Webview Cache');
      });
      this.inputUrl = this.webview.getURL();
    };

    this.ipcMessageEventCallback = (ipcMessageEvent: IpcMessageEvent) => {
      const channelContent = JSON.parse(ipcMessageEvent.channel);
      console.log('%c Webview: Recieved Action of Type ' + channelContent.className, 'color: #4242ff; font-weight: bold');
      this.webview.getWebContents().capturePage((nativeImage: NativeImage) => {
        this.webview.send('pageCaptured', { className: channelContent.className });
        const image: string = nativeImage.toDataURL();
        const channelContentWithImage = Object.assign(channelContent, { image });
        const action: HtmlElementAction = this.actionService.reviveHtmlElementAction(channelContentWithImage);

        // filter locators with empty values
        action.locators = action.locators.filter(locator => locator.value);
        this.sequence.addAction(action);
        this.actionEmitter.emit(action);
      });
    };
  }

  ngOnInit() {
    this.webview = (this.webviewRef.nativeElement) as WebviewTag;
    this.webview.setAttribute('style', `width:${this.settings.webviewWidth}px; height:${this.settings.webviewHeight}px`);
    this.webview.addEventListener('dom-ready', this.domReadyCallback);
    this.webview.addEventListener('ipc-message', this.ipcMessageEventCallback);
  }

  ngOnDestroy(): void {
    this.webview.removeEventListener('ipc-message', this.ipcMessageEventCallback);
    this.webview.removeEventListener('dom-ready', this.domReadyCallback);
  }

  public onBack(): void {
    this.webview.getWebContents().capturePage((nativeImage: NativeImage) => {
      const image: string = nativeImage.toDataURL();
      const action: Action = new Back(image);
      this.sequence.addAction(action);
      this.actionEmitter.emit(action);
      this.webview.goBack();
    });
  }

  public onForward(): void {
    this.webview.getWebContents().capturePage((nativeImage: NativeImage) => {
      const image: string = nativeImage.toDataURL();
      const action: Action = new Forward(image);
      this.sequence.addAction(action);
      this.actionEmitter.emit(action);
      this.webview.goForward();
    });
  }

  public onRefresh(): void {
    this.webview.getWebContents().capturePage((nativeImage: NativeImage) => {
      const image: string = nativeImage.toDataURL();
      const action: Action = new Refresh(image);
      this.sequence.addAction(action);
      this.actionEmitter.emit(action);
      this.webview.reload();
    });
  }

  public onLoadUrl(): void {
    this.webview.getWebContents().capturePage((nativeImage: NativeImage) => {
      this.autocorrectInputUrl();
      const image: string = nativeImage.toDataURL();
      const action: Action = new GoTo(image, this.inputUrl);
      this.sequence.addAction(action);
      this.actionEmitter.emit(action);
      this.webview.loadURL(this.inputUrl);
    });
  }

  private autocorrectInputUrl(): void {
    const https: string = this.inputUrl.slice(0, 8).toLowerCase();
    const http: string = this.inputUrl.slice(0, 7).toLowerCase();
    if (https !== 'https://' && http !== 'http://') {
      this.inputUrl = 'https://' + this.inputUrl;
    }
  }
}
