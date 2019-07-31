import { Component, Input } from '@angular/core';
import { Project } from 'chrec-core/lib/model/project';
import { ProjectTestResult } from 'chrec-core/lib/model/test-result/project-test-result';
import { TreeviewProjectTestResult } from '../../../model/treeview-test-result/treeview-project-test-result';
import { Chrome } from 'chrec-core/lib/model/browser/chrome';
import { Edge } from 'chrec-core/lib/model/browser/edge';
import { Firefox } from 'chrec-core/lib/model/browser/firefox';
import { Browser } from 'chrec-core/lib/model/browser/browser';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent {

  @Input() project: Project;

  currentProjectTestResult: ProjectTestResult;

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
  }

  getCaret(expanded: boolean): string {
    return expanded ? 'caret-down' : 'caret-right';
  }

  getTreeviewProjectTestResults(): TreeviewProjectTestResult[] {
    return this.project.getTestResults() as TreeviewProjectTestResult[];
  }
}
