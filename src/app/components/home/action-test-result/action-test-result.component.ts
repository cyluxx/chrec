import { Component, Input } from '@angular/core';
import { ActionTestResult } from 'chrec-core/lib/model/test-result/action-test-result';
import { Action } from 'chrec-core/lib/model/action/action';
import { GoTo } from 'chrec-core/lib/model/action/go-to';
import { HtmlElementAction } from 'chrec-core/lib/model/action/html-element-action/html-element-action';
import { HtmlElementActionTestResult } from 'chrec-core/lib/model/test-result/html-element-action-test-result';
import { LocatorTestResult } from 'chrec-core/lib/model/test-result/locator-test-result';
import { Locator } from 'chrec-core/lib/model/locator/locator';

@Component({
  selector: 'app-action-test-result',
  templateUrl: './action-test-result.component.html',
  styleUrls: ['./action-test-result.component.scss']
})
export class ActionTestResultComponent {

  @Input() actionTestResult: ActionTestResult;

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

  public isHtmlElementActionTestResult(actionTestResult: ActionTestResult): boolean {
    return actionTestResult instanceof HtmlElementActionTestResult;
  }

  public asHtmlElementActionTestResult(actionTestResult: ActionTestResult): HtmlElementActionTestResult {
    return actionTestResult as HtmlElementActionTestResult;
  }

  displayRecommendedLocator(locatorTestResult: LocatorTestResult): boolean {
    const recommendedLocator = (this.actionTestResult.action as HtmlElementAction).recommendedLocator;
    if (recommendedLocator) {
      return locatorTestResult.locator.method === recommendedLocator.method;
    }
  }

  getActionName(action: Action): string {
    return action.constructor.name;
  }

  getLocatorType(locator: Locator): string {
    return locator.constructor.name;
  }
}
