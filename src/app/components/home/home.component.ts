import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'chrec-core/lib/model/project';
import { ProjectService } from '../../providers/project.service';
import { ElectronService } from '../../providers/electron.service';
import { SettingsService } from '../../providers/settings.service';
import { Settings } from '../../model/settings';
import * as path from 'path';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  newProjectName: string;
  project: Project;
  settings: Settings;

  constructor(
    private electronService: ElectronService,
    private modalService: NgbModal,
    private projectService: ProjectService,
    private settingsService: SettingsService
  ) { }

  async ngOnInit() {
    this.settings = await this.settingsService.readSettings();

    // TODO: Recent Project resets on Router redirect
    const fileName = path.basename(this.settings.recentlyOpenedPath);
    const dirName = path.dirname(this.settings.recentlyOpenedPath);
    this.project = await this.projectService.readProject(fileName, dirName);
  }

  onExportProject() {
    if (this.project) {
      const absolutePath = this.electronService.getPathFromSaveDialog();
      if (absolutePath) {
        const fileName = path.basename(absolutePath);
        const dirName = path.dirname(absolutePath);
        this.projectService.exportToAlexJson(fileName, this.project, dirName);
      }
    }
  }

  onNewProject(newProjectModalContent: any) {
    this.modalService.open(newProjectModalContent).result.then(() => {
      if (this.newProjectName) {
        this.project = this.projectService.newProject(this.newProjectName);
      }
    }, () => { });
  }

  async onOpenProject() {
    const absolutePath = this.electronService.getPathFromOpenDialog();
    if (absolutePath) {
      const fileName = path.basename(absolutePath);
      const dirName = path.dirname(absolutePath);
      this.project = await this.projectService.readProject(fileName, dirName);
    }
  }

  onSaveProject() {
    if (this.project) {
      const absolutePath = this.electronService.getPathFromSaveDialog();
      if (absolutePath) {
        const fileName = path.basename(absolutePath);
        const dirName = path.dirname(absolutePath);
        this.projectService.saveProject(fileName, this.project, dirName);

        // save project to open on next startup
        this.settings.recentlyOpenedPath = absolutePath;
        this.settingsService.saveSettings(this.settings);
      }
    }
  }
}
