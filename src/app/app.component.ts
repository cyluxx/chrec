import { Component, OnInit } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { AppConfig } from '../environments/environment';
import { State } from './model/state';
import { Sequence } from 'chrec-core/lib/model/sequence';
import { Settings } from './model/settings';
import { ProjectService } from './providers/project.service';
import { SettingsService } from './providers/settings.service';
import * as path from 'path';
import { Project } from 'chrec-core/lib/model/project';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  project: Project;
  sequenceToRecord: Sequence;
  settings: Settings;
  states = State;
  currentState: State;

  constructor(
    public electronService: ElectronService,
    private projectService: ProjectService,
    private settingsService: SettingsService
  ) {
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  async ngOnInit() {
    try {
      this.settings = await this.settingsService.readSettings();
    } catch (error) {
      this.settings = this.settingsService.newDefaultSettings();
    }

    if (this.settings.recentlyOpenedPath) {
      const fileName = path.basename(this.settings.recentlyOpenedPath);
      const dirName = path.dirname(this.settings.recentlyOpenedPath);
      this.project = await this.projectService.readProject(fileName, dirName);
    }
  }

  onProject(project: Project) {
    this.project = project;
  }

  onReRecordSequence(sequence: Sequence) {
    this.sequenceToRecord = sequence;
    this.currentState = this.states.RE_RECORD;
  }

  onRecordSequence(sequence: Sequence) {
    this.sequenceToRecord = sequence;
    this.currentState = this.states.RECORD;
  }

  onSettings(settings: Settings) {
    this.settings = settings;
  }
}
