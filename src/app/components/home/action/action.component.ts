import { Component, Input } from '@angular/core';
import { Action } from 'chrec-core/lib/model/action/action';
import { GoTo } from 'chrec-core/lib/model/action/go-to';
import { HtmlElementAction } from 'chrec-core/lib/model/action/html-element-action/html-element-action';
import { Read } from 'chrec-core/lib/model/action/html-element-action/read';
import { Type } from 'chrec-core/lib/model/action/html-element-action/type';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {

  @Input() action: Action;

  constructor() { }

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
}
