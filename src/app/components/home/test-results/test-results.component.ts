import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'chrec-core/lib/model/project';
import { ProjectTestResult } from 'chrec-core/lib/model/test-result/project-test-result';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent {

  @Input() project: Project;

  currentProjectTestResult: ProjectTestResult;

  constructor() { }

}
