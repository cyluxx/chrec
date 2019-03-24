import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReplayService } from '../../../providers/replay.service';
import { Sequence } from 'chrec-core/lib/model/sequence';
import { Settings } from '../../../model/settings';
import { Action } from 'chrec-core/lib/model/action/action';
import { SequenceTestResult } from 'chrec-core/lib/model/test-result/sequence-test-result';
import { Project } from 'chrec-core/lib/model/project';

@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.scss']
})
export class SequenceComponent {

  @Input() project: Project;
  @Input() sequence: Sequence;
  @Input() settings: Settings;

  @Output() projectEmitter = new EventEmitter<Project>();

  currentAction: Action;
  currentSequenceTestResult: SequenceTestResult;

  constructor(private replayService: ReplayService) { }

  onReRecordSequence() {

  }

  async onTestSequence() {
    this.projectEmitter.emit(await this.replayService.testSequence(this.project, this.sequence, this.settings));
  }
}
