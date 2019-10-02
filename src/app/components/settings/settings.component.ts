import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Settings } from '../../model/settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  @Input() settings: Settings;

  @Output() close = new EventEmitter();
  @Output() settingsEmitter = new EventEmitter<Settings>();

  browserSettings = 'Browser';
  generalSettings = 'General';
  webdriverSettings = 'Webdriver';

  components: string[] = [
    this.generalSettings,
    this.browserSettings,
    this.webdriverSettings
  ];
  currentComponent: string = this.generalSettings;

  constructor() { }

  public onNavItem(component: string): void {
    this.currentComponent = component;
  }

  onSettings(settings: Settings) {
    this.settings = settings;
    this.settingsEmitter.emit(settings);
  }
}
