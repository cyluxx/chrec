import { Component, Input } from '@angular/core';
import { BrowserTestResult } from 'chrec-core/lib/model/test-result/browser-test-result';
import { Browser } from 'chrec-core/lib/model/browser/browser';
import { Chrome } from 'chrec-core/lib/model/browser/chrome';
import { Edge } from 'chrec-core/lib/model/browser/edge';
import { Firefox } from 'chrec-core/lib/model/browser/firefox';
import { InternetExplorer } from 'chrec-core/lib/model/browser/internet-explorer';

@Component({
  selector: 'app-browser-test-result',
  templateUrl: './browser-test-result.component.html',
  styleUrls: ['./browser-test-result.component.scss']
})
export class BrowserTestResultComponent {

  @Input() browserTestResult: BrowserTestResult;

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
    if (browser instanceof InternetExplorer) {
      return ['fab', 'internet-explorer'];
    }
  }
}
