import { Component, OnInit, Input } from '@angular/core';
import { BrowserTestResult } from 'chrec-core/lib/model/test-result/browser-test-result';
import { ActionTestResult } from 'chrec-core/lib/model/test-result/action-test-result';
import { Browser } from 'chrec-core/lib/model/browser/browser';
import { Chrome } from 'chrec-core/lib/model/browser/chrome';
import { Edge } from 'chrec-core/lib/model/browser/edge';
import { Firefox } from 'chrec-core/lib/model/browser/firefox';

@Component({
  selector: 'app-browser-test-result',
  templateUrl: './browser-test-result.component.html',
  styleUrls: ['./browser-test-result.component.scss']
})
export class BrowserTestResultComponent {

  @Input() browserTestResult: BrowserTestResult;

  currentActionTestResult: ActionTestResult;

  constructor() { }

  getIcon(browser: Browser): string[] {
    if (browser instanceof Chrome) {
      return ['fab', 'chrome'];
    }
    if (browser instanceof Edge) {
      return ['fab', 'edge'];
    }
    if (browser instanceof Firefox) {
      return ['fab', 'firefox'];
    }
  }
}
