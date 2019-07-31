import { SequenceTestResult } from 'chrec-core/lib/model/test-result/sequence-test-result';
import { TreeviewTestResult } from './treeview-test-result';
import { TreeviewBrowserTestResult } from 'src/app/model/treeview-test-result/treeview-browser-test-result';

export class TreeviewSequenceTestResult extends SequenceTestResult implements TreeviewTestResult {
  public expanded = false;

  public getBrowserTestResults(): TreeviewBrowserTestResult[] {
    return super.getBrowserTestResults() as TreeviewBrowserTestResult[];
  }
}
