import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Action } from 'chrec-core/lib/model/action/action';
import { GoTo } from 'chrec-core/lib/model/action/go-to';
import { HtmlElementAction } from 'chrec-core/lib/model/action/html-element-action/html-element-action';
import { Read } from 'chrec-core/lib/model/action/html-element-action/read';
import { Type } from 'chrec-core/lib/model/action/html-element-action/type';
import { Locator } from 'chrec-core/lib/model/locator/locator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {

  @Input() action: Action;

  @Output() deleteAction = new EventEmitter<Action>();

  constructor(private modalService: NgbModal) { }

  showDeleteModal(deleteSequenceModalContent: any) {
    this.modalService.open(deleteSequenceModalContent).result.then(() => {
      this.deleteAction.emit(this.action);
    }, () => { });
  }

  public isGoTo(action: Action): boolean {
    return action instanceof GoTo;
  }

  public asGoTo(action: Action): GoTo {
    return action as GoTo;
  }

  public isHtmlElementAction(action: Action): boolean {
    return action instanceof HtmlElementAction;
  }

  public asHtmlElementAction(action: Action): HtmlElementAction {
    return action as HtmlElementAction;
  }

  public isRead(action: Action): boolean {
    return action instanceof Read;
  }

  public asRead(action: Action): Read {
    return action as Read;
  }

  public isType(action: Action): boolean {
    return action instanceof Type;
  }

  public asType(action: Action): Type {
    return action as Type;
  }

  getActionName(action: Action): string {
    return action.constructor.name;
  }

  getLocatorType(locator: Locator): string {
    return locator.constructor.name;
  }
}
