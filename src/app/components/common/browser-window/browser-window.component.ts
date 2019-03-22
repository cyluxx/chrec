import { Component, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Settings } from '../../../model/settings';
import { Sequence } from 'chrec-core/lib/model/sequence';
import { Action } from 'chrec-core/lib/model/action/action';
import * as path from 'path';
import { Back } from 'chrec-core/lib/model/action/back';
import { Forward } from 'chrec-core/lib/model/action/forward';
import { GoTo } from 'chrec-core/lib/model/action/go-to';
import { Refresh } from 'chrec-core/lib/model/action/refresh';
import { HtmlElementAction } from 'chrec-core/lib/model/action/html-element-action/html-element-action';
import { ActionFactory } from '../../../factory/action.factory';
import { IpcMessageEvent, WebviewTag } from 'electron';

@Component({
  selector: 'app-browser-window',
  templateUrl: './browser-window.component.html',
  styleUrls: ['./browser-window.component.scss']
})
export class BrowserWindowComponent implements AfterViewInit {
  @ViewChild('webview') webviewRef: ElementRef;
  webview: WebviewTag;

  @Input() sequence: Sequence;
  @Input() settings: Settings;

  @Output() actionEmitter: EventEmitter<Action> = new EventEmitter<Action>();

  canGoBack = false;
  canGoForward = false;
  image: string;
  inputUrl: string;
  preloadScriptPath: string;

  ipcMessageEventFunction: (ipcMessageEvent: IpcMessageEvent) => void;

  constructor() { }

  ngAfterViewInit() {
    this.webview = (this.webviewRef.nativeElement) as WebviewTag;
  }

  // public ngAfterViewInit(): void {
  //   console.log(this.webviewRef);
  //   this.webview = (this.webviewRef.nativeElement) as WebviewTag;
  //   console.log(this.webview);
  //   this.webview.addEventListener('dom-ready', () => {
  //     this.inputUrl = this.webview.getURL();
  //     this.webview.loadURL('http://www.github.com');
  //   });
  // this.webview.setAttribute('style', `width:${this.settings.webviewWidth}px; height:${this.settings.webviewHeight}px;`);

  // this.webviewTag.addEventListener('dom-ready', () => {
  //   this.webviewTag.addEventListener('ipc-message', this.ipcMessageEventFunction);
  //   this.webviewTag.capturePage((nativeImage: NativeImage) => {
  //     this.infoEmitter.emit('capturing page');
  //     this.image = nativeImage.toDataURL();
  //     this.infoEmitter.emit('');
  //   });
  // });
  // }

  // constructor(private actionFactory: ActionFactory) {
  //   this.ipcMessageEventFunction = (ipcMessageEvent: IpcMessageEvent) => {
  //     const channelContent: any = JSON.parse(ipcMessageEvent.channel);

  //     if (channelContent.action) {
  //       console.log(`%c Webview: Recieved Action of Type ${channelContent.action}`, 'color: #4242ff; font-weight: bold');
  //       const action: HtmlElementAction = this.actionFactory.fromChannelContent(channelContent, this.image);
  //       this.actionEmitter.emit(action);
  //       this.webview.capturePage((nativeImage: NativeImage) => {
  //         this.infoEmitter.emit('capturing page');
  //         this.image = nativeImage.toDataURL();
  //         this.infoEmitter.emit('');
  //       });
  //       this.infoEmitter.emit('');
  //     }
  //   };
  // }

  // public ngAfterViewInit(): void {
  //   this.webview = (this.webviewRef.nativeElement) as WebviewTag;
  //   this.webview.addEventListener('dom-ready', () => {
  //     this.webview.setAttribute('style', `width:${this.settings.webviewWidth}px; height:${this.settings.webviewHeight}px;`);
  //     this.inputUrl = this.webview.getURL();
  //   });

  //   this.webviewTag.addEventListener('dom-ready', () => {
  //     this.webviewTag.addEventListener('ipc-message', this.ipcMessageEventFunction);
  //     this.webviewTag.capturePage((nativeImage: NativeImage) => {
  //       this.infoEmitter.emit('capturing page');
  //       this.image = nativeImage.toDataURL();
  //       this.infoEmitter.emit('');
  //     });
  //   });
  // }

  // constructor() {
  //   this.preloadScriptPath = path.resolve(__dirname, '../../../../preload-scripts/preload.js'); // TODO resolve path hell
  // }

  // constructor(elementRef: ElementRef, private actionFactory: ActionFactory) {
  //   this.webviewTag = elementRef.nativeElement as WebviewTag;

  //   this.ipcMessageEventFunction = (ipcMessageEvent: IpcMessageEvent) => {
  //     const channelContent: any = JSON.parse(ipcMessageEvent.channel);

  //     if (channelContent.info) {
  //       this.infoEmitter.emit(channelContent.message);
  //     } else if (channelContent.action) {
  //       console.log('%c Webview: Recieved Action of Type ' + channelContent.action, 'color: #4242ff; font-weight: bold');
  //       const action: HtmlElementAction = this.actionFactory.fromChannelContent(channelContent, this.image);
  //       this.actionEmitter.emit(action);
  //       this.webviewTag.capturePage((nativeImage: NativeImage) => {
  //         this.infoEmitter.emit('capturing page');
  //         this.image = nativeImage.toDataURL();
  //         this.infoEmitter.emit('');
  //       });
  //       this.infoEmitter.emit('');
  //     }
  //   };

  //   this.webviewTag.addEventListener('dom-ready', () => {
  //     this.webviewTag.addEventListener('ipc-message', this.ipcMessageEventFunction);
  //     this.webviewTag.capturePage((nativeImage: NativeImage) => {
  //       this.infoEmitter.emit('capturing page');
  //       this.image = nativeImage.toDataURL();
  //       this.infoEmitter.emit('');
  //     });
  //   });
  // }

  // ngOnDestroy(): void {
  //   this.webview.removeEventListener('ipc-message', this.ipcMessageEventFunction);
  // }

  public onBack(): void {
    if (this.canGoBack) {
      const action: Action = new Back('');
      this.sequence.addAction(action);
      this.webview.goBack();
    }
    this.updateNavigationPossibilities();
  }

  public onForward(): void {
    if (this.canGoForward) {
      const action: Action = new Forward('');
      this.sequence.addAction(action);
      this.webview.goForward();
    }
    this.updateNavigationPossibilities();
  }

  public onRefresh(): void {
    const action: Action = new Refresh('');
    this.sequence.addAction(action);
    this.webview.reload();
    this.updateNavigationPossibilities();
  }

  public onLoadUrl(): void {
    this.autocorrectInputUrl();
    const action: Action = new GoTo('', this.inputUrl);
    this.sequence.addAction(action);
    this.webview.loadURL(this.inputUrl);
    this.updateNavigationPossibilities();
  }

  // public onWebviewAction(action: HtmlElementAction) {
  //   this.sequence.addAction(action);
  //   this.actionEmitter.emit(action);
  //   this.infoMessage = '';
  // }

  // public onInfo(infoMessage: string) {
  //   this.infoMessage = infoMessage;
  // }

  private autocorrectInputUrl(): void {
    const https: string = this.inputUrl.slice(0, 8).toLowerCase();
    const http: string = this.inputUrl.slice(0, 7).toLowerCase();
    if (https !== 'https://' && http !== 'http://') {
      this.inputUrl = 'https://' + this.inputUrl;
    }
  }

  private updateNavigationPossibilities() {
    this.canGoBack = this.webview.canGoBack();
    this.canGoForward = this.webview.canGoForward();
  }
}
