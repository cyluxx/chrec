import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectTestResult } from 'chrec-core/lib/model/test-result/project-test-result';
import { SequenceTestResult } from 'chrec-core/lib/model/test-result/sequence-test-result';

@Component({
  selector: 'app-project-test-result',
  templateUrl: './project-test-result.component.html',
  styleUrls: ['./project-test-result.component.scss']
})
export class ProjectTestResultComponent {

  @Input() projectTestResult: ProjectTestResult;

  @Output() close = new EventEmitter();

  currentSequenceTestResult: SequenceTestResult;

  constructor() { }

}
