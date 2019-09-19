import { ProjectTestResult } from 'chrec-core/lib/model/test-result/project-test-result';
import { TreeviewTestResult } from './treeview-test-result';
import { TreeviewSequenceTestResult } from './treeview-sequence-test-result';

export class TreeviewProjectTestResult extends ProjectTestResult implements TreeviewTestResult {
  public expanded = false;

  get sequenceTestResults(): TreeviewSequenceTestResult[] {
    return this.sequenceTestResults as TreeviewSequenceTestResult[];
  }
}
