import { Component, Input } from '@angular/core';
import { SettingsService } from '../../../providers/settings.service';
import { Settings } from '../../../model/settings';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent {

  @Input() settings: Settings;

  constructor(private settingsService: SettingsService) { }

  public onSubmit(form: NgForm): void {
    this.settings.homeUrl = form.value.homeUrl;
    this.settings.webviewWidth = form.value.webviewWidth;
    this.settings.webviewHeight = form.value.webviewHeight;
    this.settingsService.saveSettings(this.settings);
  }

  public onReset(): void {
    this.settingsService.resetSettings();
  }
}
