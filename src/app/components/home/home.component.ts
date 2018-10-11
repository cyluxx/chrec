import { Component, OnInit } from '@angular/core';
import { Action } from '../../model/action';
import { RecorderState } from '../../model/recorder-state';
import { ProjectService } from '../../providers/project.service';
import { Project } from '../../model/project';
import { Sequence } from '../../model/sequence';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private projectService: ProjectService;

  project: Project;
  currentSequence: Sequence;
  currentAction: Action;
  recorderState: RecorderState;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;

    this.project = new Project();
    this.project.name = 'default project'
    this.project.sequences = [];

    this.currentSequence = new Sequence();
    this.currentSequence.actions = [];
    this.recorderState = RecorderState.stop;
  }

  ngOnInit(): void {
    this.projectService.getProject('default project')
      .then((project: Project) => {
        if (project.name) {
          this.project = project;
        }
      });
  }

  onRecordAction(action: Action) {
    if (this.isRecording()) {
      this.currentSequence.actions.push(action);
    }
  }

  onCurrentSequence(sequence: Sequence) {
    this.currentSequence = sequence;
  }

  onRecorderState(recorderState: RecorderState) {
    this.recorderState = recorderState;
  }

  onSave() {
    this.projectService.setProject(this.project);
  }

  isRecording() {
    return this.recorderState == RecorderState.record;
  }

  onClearProjects() {
    this.projectService.clearProjects();
  }

  onCloseActionInfo(): void {
    this.currentAction = null;
  }

  onActionInfo(action: Action): void {
    this.currentAction = action;
  }
}
