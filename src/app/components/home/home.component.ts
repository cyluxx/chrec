import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../providers/project.service';
import { Project } from '../../model/project';
import { Sequence } from '../../model/sequence';
import { Settings } from '../../model/settings';
import { SettingsService } from '../../providers/settings.service';
import { Action } from '../../model/action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private projectService: ProjectService;
  private settingsService: SettingsService;

  project: Project;
  settings: Settings;

  currentSequence: Sequence;

  screenshotFilename: string;
  newSequenceName: string;

  recording: boolean;
  rerecording: boolean;

  constructor(projectService: ProjectService, settingsService: SettingsService) {
    this.projectService = projectService;
    this.settingsService = settingsService;

    this.project = projectService.newDefaultProject();
    this.settings = settingsService.newDefaultSettings();
  }

  async ngOnInit(): Promise<void> {
    this.project = await this.projectService.getDefaultProject();
    this.settings = await this.settingsService.getDefaultSettings();
  }

  public onSave(): void {
    this.projectService.setDefaultProject(this.project);
  }

  public onClearProject(): void {
    this.projectService.removeDefaultProject();
  }

  public onNewSequence(): void {
    if (this.newSequenceName) {
      let sequence: Sequence = new Sequence(this.newSequenceName);
      this.project.sequences.push(sequence);
      this.currentSequence = sequence;
      this.newSequenceName = '';
    }
  }

  public onSelectSequence(sequence: Sequence): void {
    this.currentSequence = sequence;
  }

  public getCurrentAction(): Action {
    if (this.currentSequence.actions && this.currentSequence.actions.length > 0) {
      return this.currentSequence.actions[0];
    }
  }

  public onRecordSequence(): void {
    this.recording = true;
  }

  public onSubmitRecording(): void {
    this.recording = false;
  }

  public onRerecordSequence(): void {
    this.rerecording = true;
  }

  public onCancleRerecording(): void {
    this.rerecording = false;
  }

  public onSubmitRerecording(): void {
    this.rerecording = false;
  }
}
