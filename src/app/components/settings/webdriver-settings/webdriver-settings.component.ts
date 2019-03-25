import { Component, Input, EventEmitter, Output } from '@angular/core';
import { SettingsService } from '../../../providers/settings.service';
import { Settings } from '../../../model/settings';
import { Browser } from 'chrec-core/lib/model/browser/browser';
import { NgForm } from '@angular/forms';
import { Chrome } from 'chrec-core/lib/model/browser/chrome';
import { Firefox } from 'chrec-core/lib/model/browser/firefox';
import { Edge } from 'chrec-core/lib/model/browser/edge';

@Component({
  selector: 'app-webdriver-settings',
  templateUrl: './webdriver-settings.component.html',
  styleUrls: ['./webdriver-settings.component.scss']
})
export class WebdriverSettingsComponent {

  @Input() settings: Settings;

  @Output() settingsEmitter = new EventEmitter<Settings>();

  newBrowserName = '';
  newBrowserType: string;
  newBrowserWidth = 800;
  newBrowserHeight = 600;
  newBrowserHeadless = false;
  newBrowserNumberIterations = 1;
  newBrowserSleepTimeBetweenActions = 0;

  constructor(private settingsService: SettingsService) { }

  asChrome(browser: Browser): Chrome {
    return browser as Chrome;
  }

  isChrome(browser: Browser): boolean {
    return browser instanceof Chrome;
  }

  getIcon(browser: Browser): string[] {
    if (browser instanceof Chrome) {
      return ['fab', 'chrome'];
    }
    if (browser instanceof Edge) {
      return ['fab', 'edge'];
    }
    if (browser instanceof Firefox) {
      return ['fab', 'firefox'];
    }
  }

  public onAddBrowser(): void {
    if (this.newBrowserName && this.newBrowserWidth && this.newBrowserHeight) {

      for (const browser of this.settings.browsers) {
        if (this.newBrowserName === browser.getName()) {
          return;
        }
      }

      let newBrowser: Browser;
      switch (this.newBrowserType) {
        case 'Chrome':
          newBrowser = new Chrome(this.newBrowserName, this.newBrowserWidth, this.newBrowserHeight, this.newBrowserHeadless);
          break;
        case 'Edge':
          newBrowser = new Edge(this.newBrowserName, this.newBrowserWidth, this.newBrowserHeight);
          break;
        case 'Firefox':
          newBrowser = new Firefox(this.newBrowserName, this.newBrowserWidth, this.newBrowserHeight);
          break;
      }

      this.settings.browsers.push(newBrowser);
      this.settingsService.saveSettings(this.settings);
    }
  }

  public onDeleteBrowser(browserToDelete: Browser): void {
    const browsers: Browser[] = [];
    for (const browser of this.settings.browsers) {
      if (browser.getName() !== browserToDelete.getName()) {
        browsers.push(browser);
      }
    }
    this.settings.browsers = browsers;
    this.settingsService.saveSettings(this.settings);
  }

  public onSubmit(form: NgForm): void {
    this.settings.seleniumGridUrl = form.value.seleniumGridUrl;
    this.settingsService.saveSettings(this.settings);
  }
}
