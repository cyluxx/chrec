import { SequenceTestResult } from 'chrec-core/lib/model/test-result/sequence-test-result';
import { TreeviewTestResult } from './treeview-test-result';

export class TreeviewSeuqenceTestResult extends SequenceTestResult implements TreeviewTestResult {
  public expanded = false;
}
