import { ProjectTestResult } from 'chrec-core/lib/model/test-result/project-test-result';
import { TreeviewTestResult } from './treeview-test-result';
import { TreeviewSequenceTestResult } from 'src/app/model/treeview-test-result/treeview-sequence-test-result';

export class TreeviewProjectTestResult extends ProjectTestResult implements TreeviewTestResult {
  public expanded = false;

  public getSequenceTestResults(): TreeviewSequenceTestResult[] {
    return super.getSequenceTestResults() as TreeviewSequenceTestResult[];
  }
}
