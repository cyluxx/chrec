import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReplayService } from '../../../providers/replay.service';
import { Sequence } from 'chrec-core/lib/model/sequence';
import { Settings } from '../../../model/settings';
import { Action } from 'chrec-core/lib/model/action/action';
import { SequenceTestResult } from 'chrec-core/lib/model/test-result/sequence-test-result';
import { Project } from 'chrec-core/lib/model/project';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  @Output() deleteSequence = new EventEmitter<Sequence>();
  @Output() reRecordSequence = new EventEmitter<Sequence>();

  currentAction: Action;
  currentSequenceTestResult: SequenceTestResult;
  errorSequence: Sequence;

  constructor(private modalService: NgbModal, private replayService: ReplayService) { }

  onDeleteAction(action: Action) {
    this.sequence.actions = this.sequence.actions.filter(act => act !== action);
    this.projectEmitter.emit(this.project);
    this.currentAction = null;
  }

  async onTestSequence(reRecordSequenceModalContent: any) {
    this.projectEmitter.emit(await this.replayService.testSequence(this.project, this.sequence, this.settings));
    this.replayService.setRecommendedLocators(this.project);
    const testResults = this.project.projectTestResults;
    if (testResults.length > 0 && !testResults[testResults.length - 1].isReplayable()) {
      for (const sequenceTestResult of testResults[testResults.length - 1].sequenceTestResults) {
        if (!sequenceTestResult.isReplayable()) {
          this.errorSequence = sequenceTestResult.sequence;
          break;
        }
      }
      this.showReRecordModal(reRecordSequenceModalContent);
    }
  }

  showReRecordModal(reRecordSequenceModalContent: any) {
    this.modalService.open(reRecordSequenceModalContent).result.then(() => {
      this.reRecordSequence.emit(this.errorSequence);
    }, () => { });
  }

  showDeleteModal(deleteSequenceModalContent: any) {
    this.modalService.open(deleteSequenceModalContent).result.then(() => {
      this.deleteSequence.emit(this.sequence);
    }, () => { });
  }

  getActionName(action: Action): string {
    return action.constructor.name;
  }
}
