import { Directive, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { WebviewTag, IpcMessageEvent, NativeImage, ConsoleMessageEvent } from 'electron';
import { HtmlElementAction, Click, Read, Type } from '../model/action';
import { ActionFactory } from '../factory/action.factory';

@Directive({
  selector: 'webview'
})
export class WebviewDirective implements OnDestroy {
  webviewTag: WebviewTag;
  
  private actionFactory: ActionFactory;

  ipcMessageEventFunction: (ipcMessageEvent: IpcMessageEvent) => void;
  consoleMessageEventFunction: (consoleMessageEvent: ConsoleMessageEvent) => void;

  @Output() actionEmitter = new EventEmitter<HtmlElementAction>();

  @Output() infoEmitter = new EventEmitter<string>();

  constructor(elementRef: ElementRef, actionFactory: ActionFactory) {
    this.webviewTag = elementRef.nativeElement as WebviewTag;

    this.actionFactory = actionFactory;

    this.ipcMessageEventFunction = (ipcMessageEvent: IpcMessageEvent) => {
      let channelContent = JSON.parse(ipcMessageEvent.channel);

      if (channelContent.info) {
        this.infoEmitter.emit(channelContent.message);
      }
      else if (channelContent.action) {
        console.log('%c Webview: Recieved Action of Type ' + channelContent.action, 'color: #4242ff; font-weight: bold');

        this.infoEmitter.emit('capturing page');
        this.webviewTag.capturePage((nativeImage: NativeImage) => {
          let image: string = nativeImage.toDataURL();

          let action: HtmlElementAction = this.actionFactory.fromChannelContent(channelContent, image);

          this.actionEmitter.emit(action);
          this.infoEmitter.emit(null);
        });
      }

      this.consoleMessageEventFunction = (consoleMessageEvent: ConsoleMessageEvent) => {
        console.log('%c ---Webview---', 'color: #ff4242; font-weight: bold');
        console.log(consoleMessageEvent.message);
        console.log('%c -------------', 'color: #ff4242; font-weight: bold')
      }
    }

    this.webviewTag.addEventListener('dom-ready', () => {
      this.webviewTag.addEventListener('ipc-message', this.ipcMessageEventFunction);
      this.webviewTag.addEventListener('console-message', this.consoleMessageEventFunction);
      this.webviewTag.openDevTools();
    });
  }

  ngOnDestroy(): void {
    this.webviewTag.removeEventListener('ipc-message', this.ipcMessageEventFunction);
    this.webviewTag.removeEventListener('console-message', this.consoleMessageEventFunction);
  }
}
