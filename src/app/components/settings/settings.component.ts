import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SettingsService } from '../../providers/settings.service';
import { Settings } from '../../model/settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  @Input() settings: Settings;

  @Output() close = new EventEmitter();

  generalSettings = 'General Settings';
  webdriverSettings = 'Webdriver Settings';

  components: string[] = [this.generalSettings, this.webdriverSettings];
  currentComponent: string = this.generalSettings;

  constructor() { }

  public onNavItem(component: string): void {
    this.currentComponent = component;
  }
}
