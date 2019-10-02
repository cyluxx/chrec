import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Settings } from '../../../model/settings';
import { SettingsService } from '../../../providers/settings.service';

@Component({
  selector: 'app-webdriver-settings',
  templateUrl: './webdriver-settings.component.html',
  styleUrls: ['./webdriver-settings.component.scss']
})
export class WebdriverSettingsComponent {

  @Input() settings: Settings;

  @Output() settingsEmitter = new EventEmitter<Settings>();

  constructor(private settingsService: SettingsService) { }

  public onSubmit(form: NgForm): void {
    this.settings.seleniumGridUrl = form.value.seleniumGridUrl;
    this.settingsService.saveSettings(this.settings);
  }
}
