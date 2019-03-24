import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SequenceTestResult } from 'chrec-core/lib/model/test-result/sequence-test-result';
import { Browser } from 'chrec-core/lib/model/browser/browser';
import { Chrome } from 'chrec-core/lib/model/browser/chrome';
import { Edge } from 'chrec-core/lib/model/browser/edge';
import { Firefox } from 'chrec-core/lib/model/browser/firefox';

@Component({
  selector: 'app-sequence-test-result',
  templateUrl: './sequence-test-result.component.html',
  styleUrls: ['./sequence-test-result.component.scss']
})
export class SequenceTestResultComponent {

  @Input() sequenceTestResult: SequenceTestResult;

  @Output() close = new EventEmitter();

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
