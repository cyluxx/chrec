import { Directive, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { WebviewTag, IpcMessageEvent, NativeImage } from 'electron';
import { HtmlElementAction, Click, Read, Type } from '../model/action';

@Directive({
  selector: 'webview'
})
export class WebviewDirective implements OnDestroy {
  webviewTag: WebviewTag;
  ipcMessageEventFunction: (ipcMessageEvent: IpcMessageEvent) => void;

  @Output() actionEmitter = new EventEmitter<HtmlElementAction>();

  constructor(elementRef: ElementRef) {
    this.webviewTag = elementRef.nativeElement as WebviewTag;

    this.ipcMessageEventFunction = (ipcMessageEvent: IpcMessageEvent) => {
      let channelContent = JSON.parse(ipcMessageEvent.channel);

      this.webviewTag.capturePage((nativeImage: NativeImage) => {
        let image: string = nativeImage.toDataURL();

        let action: HtmlElementAction;
        switch (channelContent.action) {
          case 'click': {
            action = new Click(
              image,
              channelContent.selectors,
              channelContent.boundingBox);
            break;
          }
          case 'read': {
            action = new Read(
              image,
              channelContent.selectors,
              channelContent.boundingBox,
              channelContent.value);
            break;
          }
          case 'type': {
            action = new Type(
              image,
              channelContent.selectors,
              channelContent.boundingBox,
              channelContent.value,
              channelContent.keyCode);
            break;
          }
        }
        this.actionEmitter.emit(action);
      });
    }
    this.webviewTag.addEventListener('dom-ready', () => {
      this.webviewTag.addEventListener('ipc-message', this.ipcMessageEventFunction);
      this.webviewTag.openDevTools();
    });
  }

  ngOnDestroy(): void {
    this.webviewTag.removeEventListener('ipc-message', this.ipcMessageEventFunction);
  }
}
