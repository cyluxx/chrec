import { Directive, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { WebviewTag, IpcMessageEvent } from 'electron';
import { Action, Type } from '../model/action';

@Directive({
  selector: 'webview'
})
export class WebviewDirective implements OnDestroy {
  webviewTag: WebviewTag;
  ipcMessageEventFunction: (ipcMessageEvent: IpcMessageEvent) => void;

  @Output() actionEmitter = new EventEmitter<Action>();

  constructor(elementRef: ElementRef) {
    this.webviewTag = elementRef.nativeElement as WebviewTag;

    this.ipcMessageEventFunction = (ipcMessageEvent: IpcMessageEvent) => {
      let channelContent = JSON.parse(ipcMessageEvent.channel);
      let action: Action = new Action();
      if(channelContent.type == 'focusout'){
        action.type = Type.type;
      }
      else {
        action.type = Type[channelContent.type as string];
      }
      action.selectors = channelContent.selectors;
      action.value = channelContent.value;
      action.url = channelContent.url;
      action.keyCode = channelContent.keyCode;
      action.boundingBox = channelContent.boundingBox;
      this.actionEmitter.emit(action);
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
