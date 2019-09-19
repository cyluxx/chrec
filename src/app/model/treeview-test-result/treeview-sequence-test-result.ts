import { SequenceTestResult } from 'chrec-core/lib/model/test-result/sequence-test-result';
import { TreeviewTestResult } from './treeview-test-result';
import { TreeviewBrowserTestResult } from './treeview-browser-test-result';

export class TreeviewSequenceTestResult extends SequenceTestResult implements TreeviewTestResult {
  public expanded = false;

  get browserTestResults(): TreeviewBrowserTestResult[] {
    return this.browserTestResults as TreeviewBrowserTestResult[];
  }
}
