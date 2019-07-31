import { Component, Input } from '@angular/core';
import { Project } from 'chrec-core/lib/model/project';
import { ProjectTestResult } from 'chrec-core/lib/model/test-result/project-test-result';
import { TreeviewProjectTestResult } from '../../../model/treeview-test-result/treeview-project-test-result';
import { Chrome } from 'chrec-core/lib/model/browser/chrome';
import { Edge } from 'chrec-core/lib/model/browser/edge';
import { Firefox } from 'chrec-core/lib/model/browser/firefox';
import { Browser } from 'chrec-core/lib/model/browser/browser';
import { SequenceTestResult } from 'chrec-core/lib/model/test-result/sequence-test-result';
import { BrowserTestResult } from 'chrec-core/lib/model/test-result/browser-test-result';
import { ActionTestResult } from 'chrec-core/lib/model/test-result/action-test-result';
import { TreeviewSequenceTestResult } from '../../../model/treeview-test-result/treeview-sequence-test-result';
import { TreeviewBrowserTestResult } from '../../../model/treeview-test-result/treeview-browser-test-result';
import { InternetExplorer } from 'chrec-core/lib/model/browser/internet-explorer';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent {

  @Input() project: Project;

  currentProjectTestResult: ProjectTestResult;
  currentSequenceTestResult: SequenceTestResult;
  currentBrowserTestResult: BrowserTestResult;
  currentActionTestResult: ActionTestResult;

  constructor() { }

  getBrowserIcon(browser: Browser): string[] {
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

  getCaret(expanded: boolean): string {
    return expanded ? 'caret-down' : 'caret-right';
  }

  getTreeviewProjectTestResults(): TreeviewProjectTestResult[] {
    return this.project.getTestResults() as TreeviewProjectTestResult[];
  }

  onProjectTestResult(projectTestResult: TreeviewProjectTestResult) {
    projectTestResult.expanded = !projectTestResult.expanded;
    this.currentProjectTestResult = projectTestResult;
    this.currentSequenceTestResult = null;
    this.currentBrowserTestResult = null;
    this.currentActionTestResult = null;
  }

  onSequenceTestResult(sequenceTestResult: TreeviewSequenceTestResult) {
    sequenceTestResult.expanded = !sequenceTestResult.expanded;
    this.currentSequenceTestResult = sequenceTestResult;
    this.currentBrowserTestResult = null;
    this.currentActionTestResult = null;
  }

  onBrowserTestResult(browserTestResult: TreeviewBrowserTestResult) {
    browserTestResult.expanded = !browserTestResult.expanded;
    this.currentBrowserTestResult = browserTestResult;
    this.currentActionTestResult = null;
  }

  onActionTestResult(actionTestResult: ActionTestResult) {
    this.currentActionTestResult = actionTestResult;
  }
}
