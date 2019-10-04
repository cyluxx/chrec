import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SettingsService } from '../../../providers/settings.service';
import { Settings } from '../../../model/settings';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent {

  @Input() settings: Settings;

  @Output() settingsEmitter = new EventEmitter<Settings>();

  constructor(private settingsService: SettingsService, private modalService: NgbModal) { }

  public onSubmit(): void {
    this.settingsService.saveSettings(this.settings);
    this.settingsEmitter.emit(this.settings);
  }

  public onResetSettings(resetSettingsModalContent: any): void {
    this.modalService.open(resetSettingsModalContent).result.then(async () => {
      await this.settingsService.resetSettings();
      this.settings = await this.settingsService.readSettings();
      this.settingsEmitter.emit(this.settings);
    }, () => { });
  }
}
