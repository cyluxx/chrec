import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../providers/project.service';
import { Project } from '../../model/project';
import { Sequence } from '../../model/sequence';
import { Settings } from '../../model/settings';
import { SettingsService } from '../../providers/settings.service';
import { Action } from '../../model/action';
import { BrowserFactory } from '../../factory/browser.factory';
import { AlexExportService } from '../../providers/alex-export.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private projectService: ProjectService;
  private settingsService: SettingsService;
  private browserFactory: BrowserFactory;
  private alexExportService: AlexExportService;
  private modalService: NgbModal;

  project: Project;
  settings: Settings;

  currentSequence: Sequence;

  screenshotFilename: string;
  newSequenceName: string;

  recording: boolean;
  rerecording: boolean;

  constructor(projectService: ProjectService, settingsService: SettingsService, browserFactory: BrowserFactory, alexExportService: AlexExportService, modalService: NgbModal) {
    this.projectService = projectService;
    this.settingsService = settingsService;
    this.browserFactory = browserFactory;
    this.alexExportService = alexExportService;
    this.modalService = modalService;

    this.project = projectService.newDefaultProject();
    this.settings = settingsService.newDefaultSettings();
  }

  async ngOnInit(): Promise<void> {
    this.project = await this.projectService.getDefaultProject();
    this.settings = await this.settingsService.getDefaultSettings();
  }

  public onSave(): void {
    console.log('home onSave');
    console.log(this.project);
    this.projectService.setDefaultProject(this.project);
  }

  public onClearProject(): void {
    this.projectService.removeDefaultProject();
  }

  public onNewSequence(): void {
    if (this.newSequenceName) {
      let sequence: Sequence = new Sequence(this.newSequenceName);
      for (let browser of this.settings.browsers) {
        sequence.browsers.push(this.browserFactory.fromBrowser(browser));
      }
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

  public onExportToAlex(): void {
    const modalRef = this.modalService.open(ExportToAlexModal, { centered: true });
    modalRef.result.then((result) => {
      this.alexExportService.export(result.fileName, this.project, result.path);
    }, () => { });
  }
}

@Component({
  selector: 'export-to-alex-modal',
  templateUrl: './export-to-alex.modal.html'
})
export class ExportToAlexModal {

  fileName: string;
  path: string;

  constructor(public activeModal: NgbActiveModal) { }
}
