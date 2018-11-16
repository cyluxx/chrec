import { Component, OnInit } from '@angular/core';
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

  screenshotFilename: string;
  newSequenceName: string;

  recording: boolean;

  constructor(projectService: ProjectService, settingsService: SettingsService, webdriverService: WebdriverService) {
    this.projectService = projectService;
    this.settingsService = settingsService;
    this.webdriverService = webdriverService;

    this.project = new Project();
    this.project.name = DEFAULT_PROJECT;
    this.project.sequences = [];

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

  public async onPlay(): Promise<void> {
    await this.playSequence(this.currentSequence);
  }

  public async onPlayAll(): Promise<void> {
    for (let sequence of this.project.sequences) {
      await this.playSequence(sequence);
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

  public onRecordSequence(): void {
    this.recording = true;
  }

  public onStopRecording(): void {
    this.recording = false;
  }
}
