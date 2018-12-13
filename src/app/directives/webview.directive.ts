import { Directive, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { WebviewTag, IpcMessageEvent, NativeImage, ConsoleMessageEvent } from 'electron';
import { HtmlElementAction, Click, Read, Type } from '../model/action';
import { Selector } from '../model/selector';

@Directive({
  selector: 'webview'
})
export class WebviewDirective implements OnDestroy {
  webviewTag: WebviewTag;
  ipcMessageEventFunction: (ipcMessageEvent: IpcMessageEvent) => void;
  consoleMessageEventFunction: (consoleMessageEvent: ConsoleMessageEvent) => void;

  @Output() actionEmitter = new EventEmitter<HtmlElementAction>();

  @Output() infoEmitter = new EventEmitter<string>();

  constructor(elementRef: ElementRef) {
    this.webviewTag = elementRef.nativeElement as WebviewTag;

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

          let selectors: Selector[] = [];
          for(let selector of channelContent.selectors){
            let newSelector: Selector = new Selector(selector.method, selector.value);
            selectors.push(newSelector);
          }

          let action: HtmlElementAction;
          switch (channelContent.action) {
            case 'click': {
              action = new Click(
                image,
                selectors,
                channelContent.boundingBox);
              break;
            }
            case 'read': {
              action = new Read(
                image,
                selectors,
                channelContent.boundingBox,
                channelContent.value);
              break;
            }
            case 'type': {
              action = new Type(
                image,
                selectors,
                channelContent.boundingBox,
                channelContent.value,
                channelContent.key);
              break;
            }
          }
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
