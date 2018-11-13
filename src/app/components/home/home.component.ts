import { Component, OnInit } from '@angular/core';
import { RecorderState } from '../../model/recorder-state';
import { ProjectService } from '../../providers/project.service';
import { Project } from '../../model/project';
import { Sequence } from '../../model/sequence';
import { Settings } from '../../model/settings';
import { SettingsService } from '../../providers/settings.service';
import { WebdriverService } from '../../providers/webdriver.service';

const DEFAULT_PROJECT = 'default project';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private projectService: ProjectService;
  private settingsService: SettingsService;
  private webdriverService: WebdriverService;

  project: Project;
  settings: Settings;

  currentSequence: Sequence;

  recorderState: RecorderState;

  screenshotFilename: string;
  newSequenceName: string;

  constructor(projectService: ProjectService, settingsService: SettingsService, webdriverService: WebdriverService) {
    this.projectService = projectService;
    this.settingsService = settingsService;
    this.webdriverService = webdriverService;

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

  public onSave(): void {
    this.projectService.setProject(this.project);
  }

  public onClearProject(): void {
    this.projectService.removeProject(DEFAULT_PROJECT);
  }

  onStop() {
    this.recorderState = RecorderState.stop;
  }

  public async onPlay(): Promise<void> {
    this.recorderState = RecorderState.play;
    await this.playSequence(this.currentSequence);
    this.recorderState = RecorderState.stop;
  }

  public async onPlayAll(): Promise<void> {
    this.recorderState = RecorderState.play;
    for (let sequence of this.project.sequences) {
      await this.playSequence(sequence);
    }
    this.recorderState = RecorderState.stop;
  }

  public onRecord(): void {
    if (this.currentSequence.name) {
      this.recorderState = RecorderState.record;
    }
  }

  public onNewSequence(): void {
    if (this.newSequenceName) {
      let sequence: Sequence = new Sequence();
      sequence.name = this.newSequenceName;
      sequence.actions = [];
      this.project.sequences.push(sequence);
      this.currentSequence = sequence;
      this.newSequenceName = '';
    }
  }

  public onSelectSequence(sequence: Sequence): void {
    this.currentSequence = sequence;
  }

  public isRecording(): boolean {
    return this.recorderState == RecorderState.record;
  }

  public onCloseSequenceInfo(): void {
    this.currentSequence = new Sequence();
    this.currentSequence.actions = [];
  }

  private async playSequence(sequence: Sequence): Promise<void> {
    try {
      await this.webdriverService.run(sequence, this.settings);
      this.currentSequence.executable = true;
    }
    catch (error) {
      if (error.name === 'NoSuchElementError') {
        sequence.executable = false;
      }
    }
  }
}
