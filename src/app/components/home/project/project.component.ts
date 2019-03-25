import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from 'chrec-core/lib/model/project';
import { ReplayService } from '../../../providers/replay.service';
import { Settings } from '../../../model/settings';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sequence } from 'chrec-core/lib/model/sequence';
import { ProjectTestResult } from 'chrec-core/lib/model/test-result/project-test-result';
import { SequenceTestResult } from 'chrec-core/lib/model/test-result/sequence-test-result';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

  @Input() project: Project;
  @Input() settings: Settings;

  @Output() reRecordSequence = new EventEmitter<Sequence>();
  @Output() recordSequence = new EventEmitter<Sequence>();

  currentProjectTestResult: ProjectTestResult;
  moreTestResults = false;
  newSequenceName: string;

  constructor(private modalService: NgbModal, private replayService: ReplayService) { }

  onProject(project: Project) {
    this.project = project;
  }

  onNewSequence(newSequenceModalContent: any) {
    this.modalService.open(newSequenceModalContent).result.then(() => {
      if (this.newSequenceName) {
        const sequence = new Sequence(this.newSequenceName, []);
        this.project.addSequence(sequence);
        this.recordSequence.emit(sequence);
      }
    }, () => { });
  }

  async onTestProject() {
    this.project = await this.replayService.testProject(this.project, this.settings);
  }
}
