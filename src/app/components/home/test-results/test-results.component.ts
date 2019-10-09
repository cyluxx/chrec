import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'chrec-core/lib/model/project';
import { ProjectTestResult } from 'chrec-core/lib/model/test-result/project-test-result';
import { Chrome } from 'chrec-core/lib/model/browser/chrome';
import { Edge } from 'chrec-core/lib/model/browser/edge';
import { Firefox } from 'chrec-core/lib/model/browser/firefox';
import { Browser } from 'chrec-core/lib/model/browser/browser';
import { SequenceTestResult } from 'chrec-core/lib/model/test-result/sequence-test-result';
import { BrowserTestResult } from 'chrec-core/lib/model/test-result/browser-test-result';
import { ActionTestResult } from 'chrec-core/lib/model/test-result/action-test-result';
import { InternetExplorer } from 'chrec-core/lib/model/browser/internet-explorer';

interface TreeviewTestResult {
  expanded: boolean;
}

class TreeviewProjectTestResult extends ProjectTestResult implements TreeviewTestResult {
  public expanded = false;

  get sequenceTestResults(): TreeviewSequenceTestResult[] {
    return this.sequenceTestResults as TreeviewSequenceTestResult[];
  }
}

class TreeviewSequenceTestResult extends SequenceTestResult implements TreeviewTestResult {
  public expanded = false;

  get browserTestResults(): TreeviewBrowserTestResult[] {
    return this.browserTestResults as TreeviewBrowserTestResult[];
  }
}

class TreeviewBrowserTestResult extends BrowserTestResult implements TreeviewTestResult {
  public expanded = false;
}

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent {

  @Input() project: Project;

  currentProjectTestResult: TreeviewProjectTestResult;
  currentSequenceTestResult: TreeviewSequenceTestResult;
  currentBrowserTestResult: TreeviewBrowserTestResult;
  currentActionTestResult: ActionTestResult;

  get treeviewProjectTestResults(): TreeviewProjectTestResult[] {
    return this.project.projectTestResults as TreeviewProjectTestResult[];
  }

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

  onProjectTestResult(projectTestResult: TreeviewProjectTestResult) {
    if (this.currentProjectTestResult) {
      this.currentProjectTestResult.expanded = false;
    }
    if (this.currentSequenceTestResult) {
      this.currentSequenceTestResult.expanded = false;
    }
    if (this.currentBrowserTestResult) {
      this.currentBrowserTestResult.expanded = false;
    }

    this.currentProjectTestResult = projectTestResult;
    this.currentSequenceTestResult = null;
    this.currentBrowserTestResult = null;
    this.currentActionTestResult = null;

    this.currentProjectTestResult.expanded = true;
  }

  onSequenceTestResult(sequenceTestResult: TreeviewSequenceTestResult) {
    if (this.currentSequenceTestResult) {
      this.currentSequenceTestResult.expanded = false;
    }
    if (this.currentBrowserTestResult) {
      this.currentBrowserTestResult.expanded = false;
    }

    this.currentSequenceTestResult = sequenceTestResult;
    this.currentBrowserTestResult = null;
    this.currentActionTestResult = null;

    this.currentSequenceTestResult.expanded = true;
  }

  onBrowserTestResult(browserTestResult: TreeviewBrowserTestResult) {
    if (this.currentBrowserTestResult) {
      this.currentBrowserTestResult.expanded = false;
    }

    this.currentBrowserTestResult = browserTestResult;
    this.currentActionTestResult = null;

    this.currentBrowserTestResult.expanded = true;
  }

  onActionTestResult(actionTestResult: ActionTestResult) {
    this.currentActionTestResult = actionTestResult;
  }
}
