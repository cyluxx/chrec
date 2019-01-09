import { Directive, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { WebviewTag, IpcMessageEvent, NativeImage, ConsoleMessageEvent } from 'electron';
import { HtmlElementAction } from '../model/action';
import { ActionFactory } from '../factory/action.factory';

@Directive({
  selector: 'webview'
})
export class WebviewDirective implements OnDestroy {
  webviewTag: WebviewTag;

  private actionFactory: ActionFactory;

  ipcMessageEventFunction: (ipcMessageEvent: IpcMessageEvent) => void;

  @Output() actionEmitter = new EventEmitter<HtmlElementAction>();

  @Output() infoEmitter = new EventEmitter<string>();

  image: string = '';

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
        let action: HtmlElementAction = this.actionFactory.fromChannelContent(channelContent, this.image);
        this.actionEmitter.emit(action);
        this.webviewTag.capturePage((nativeImage: NativeImage) => {
          this.infoEmitter.emit('capturing page');
          this.image = nativeImage.toDataURL();
          this.infoEmitter.emit('');
        });
        this.infoEmitter.emit('');
      }
    }

    this.webviewTag.addEventListener('dom-ready', () => {
      this.webviewTag.addEventListener('ipc-message', this.ipcMessageEventFunction);
      this.webviewTag.capturePage((nativeImage: NativeImage) => {
        this.infoEmitter.emit('capturing page');
        this.image = nativeImage.toDataURL();
        this.infoEmitter.emit('');
      });
      //this.webviewTag.openDevTools();
    });
  }

  ngOnDestroy(): void {
    this.webviewTag.removeEventListener('ipc-message', this.ipcMessageEventFunction);
  }
}
