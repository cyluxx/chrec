import { Component, OnInit, Input } from '@angular/core';
import { BrowserTestResult } from 'chrec-core/lib/model/test-result/browser-test-result';
import { ActionTestResult } from 'chrec-core/lib/model/test-result/action-test-result';

@Component({
  selector: 'app-browser-test-result',
  templateUrl: './browser-test-result.component.html',
  styleUrls: ['./browser-test-result.component.scss']
})
export class BrowserTestResultComponent {

  @Input() browserTestResult: BrowserTestResult;

  currentActionTestResult: ActionTestResult;

  constructor() { }

}
