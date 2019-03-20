import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'chrec-core/lib/model/project';
import { ProjectService } from '../../providers/project.service';
import { ElectronService } from '../../providers/electron.service';
import * as path from 'path';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  newProjectName: string;
  project: Project;

  constructor(private electronService: ElectronService, private modalService: NgbModal, private projectService: ProjectService) { }

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
      }
    }
  }
}
