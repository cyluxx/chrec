import { ProjectTestResult } from 'chrec-core/lib/model/test-result/project-test-result';
import { TreeviewTestResult } from './treeview-test-result';

export class ViewProjectTestResult extends ProjectTestResult implements TreeviewTestResult {
  public expanded = false;
}
