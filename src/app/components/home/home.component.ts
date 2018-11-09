import { Component, OnInit } from '@angular/core';
import { Action } from '../../model/action';
import { RecorderState } from '../../model/recorder-state';
import { ProjectService } from '../../providers/project.service';
import { Project } from '../../model/project';
import { Sequence } from '../../model/sequence';
import { Settings } from '../../model/settings';
import { SettingsService } from '../../providers/settings.service';

const DEFAULT_PROJECT = 'default project';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private projectService: ProjectService;
  private settingsService: SettingsService;

  project: Project;
  currentSequence: Sequence;
  currentAction: Action;
  recorderState: RecorderState;

  settings: Settings;

  constructor(projectService: ProjectService, settingsService: SettingsService) {
    this.projectService = projectService;
    this.settingsService = settingsService;

    this.project = new Project();
    this.project.name = DEFAULT_PROJECT;
    this.project.sequences = [];

    this.currentSequence = new Sequence();
    this.currentSequence.actions = [];
    this.recorderState = RecorderState.stop;

    this.settings = new Settings();
  }

  ngOnInit(): void {
    this.projectService.getProject(DEFAULT_PROJECT)
      .then((project: Project) => {
        if (project.name) {
          this.project = project;
        }
      });
    this.settingsService.getSettings()
      .then((settings: Settings) => {
        if (settings) {
          this.settings = settings;
          if (!settings.browsers) {
            this.settings.browsers = [];
          }
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
    this.projectService.removeProject(DEFAULT_PROJECT);
  }

  onCloseActionInfo(): void {
    this.currentAction = null;
  }

  onActionInfo(action: Action): void {
    this.currentAction = action;
  }

  onSequenceNotExecutable(sequence: Sequence): void {
    
  }
}
