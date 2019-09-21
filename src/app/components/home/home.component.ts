import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'chrec-core/lib/model/project';
import { ProjectService } from '../../providers/project.service';
import { ElectronService } from '../../providers/electron.service';
import { SettingsService } from '../../providers/settings.service';
import { Settings } from '../../model/settings';
import * as path from 'path';
import { ReplayService } from '../../providers/replay.service';
import { Sequence } from 'chrec-core/lib/model/sequence';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @Input() project: Project;
  @Input() settings: Settings;

  @Output() projectEmitter = new EventEmitter<Project>();
  @Output() reRecordSequence = new EventEmitter();
  @Output() recordSequence = new EventEmitter();
  @Output() settingsEmitter = new EventEmitter();

  newProjectName: string;
  errorSequence: Sequence;
  newSequenceName: string;
  showTestResults = false;

  constructor(
    private electronService: ElectronService,
    private modalService: NgbModal,
    private projectService: ProjectService,
    private settingsService: SettingsService,
    private replayService: ReplayService
  ) { }

  onExportProject() {
    if (this.project) {
      const absolutePath = this.electronService.getPathFromSaveDialog();
      if (absolutePath && path.isAbsolute(absolutePath)) {
        this.projectService.exportAlexJson(this.project, absolutePath);
      }
    }
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

  onNewProject(newProjectModalContent: any) {
    this.modalService.open(newProjectModalContent).result.then(() => {
      if (this.newProjectName) {
        this.project = this.projectService.newProject(this.newProjectName);
        this.projectEmitter.emit(this.project);
      }
    }, () => { });
  }

  async onTestProject(reRecordSequenceModalContent: any) {
    this.project = await this.replayService.testProject(this.project, this.settings);
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

  async onOpenProject() {
    const absolutePath = this.electronService.getPathFromOpenDialog();
    if (absolutePath && path.isAbsolute(absolutePath)) {
      this.project = await this.projectService.readProject(absolutePath);
      this.projectEmitter.emit(this.project);

      // save project to open on next startup
      this.settings.recentlyOpenedPath = absolutePath;
      this.settingsService.saveSettings(this.settings);
    }
  }

  onProject(project: Project) {
    this.project = project;
  }

  onSaveProject() {
    if (this.project) {
      const absolutePath = this.electronService.getPathFromSaveDialog();
      if (absolutePath && path.isAbsolute(absolutePath)) {
        this.projectService.saveProject(this.project, absolutePath);

        // save project to open on next startup
        this.settings.recentlyOpenedPath = absolutePath;
        this.settingsService.saveSettings(this.settings);
      }
    }
  }

  showReRecordModal(reRecordSequenceModalContent: any) {
    this.modalService.open(reRecordSequenceModalContent).result.then(() => {
      this.reRecordSequence.emit(this.errorSequence);
    }, () => { });
  }
}
