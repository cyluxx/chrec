import { BrowserTestResult } from 'chrec-core/lib/model/test-result/browser-test-result';
import { TreeviewTestResult } from './treeview-test-result';

export class TreeviewBrowserTestResult extends BrowserTestResult implements TreeviewTestResult {
  public expanded = true;
}
