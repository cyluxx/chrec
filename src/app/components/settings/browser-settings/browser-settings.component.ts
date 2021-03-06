import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Settings } from '../../../model/settings';
import { SettingsService } from '../../../providers/settings.service';
import { Chrome } from 'chrec-core/lib/model/browser/chrome';
import { Browser } from 'chrec-core/lib/model/browser/browser';
import { Edge } from 'chrec-core/lib/model/browser/edge';
import { Firefox } from 'chrec-core/lib/model/browser/firefox';
import { InternetExplorer } from 'chrec-core/lib/model/browser/internet-explorer';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-browser-settings',
  templateUrl: './browser-settings.component.html',
  styleUrls: ['./browser-settings.component.scss']
})
export class BrowserSettingsComponent {

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
    if (browser instanceof InternetExplorer) {
      return ['fab', 'internet-explorer'];
    }
  }

  public onAddBrowser(): void {
    if (this.newBrowserName && this.newBrowserWidth && this.newBrowserHeight) {

      for (const browser of this.settings.browsers) {
        if (this.newBrowserName === browser.name) {
          return;
        }
      }

      let newBrowser: Browser;
      switch (this.newBrowserType) {
        case 'Chrome':
          newBrowser = new Chrome(
            this.newBrowserName,
            this.newBrowserWidth,
            this.newBrowserHeight,
            this.newBrowserSleepTimeBetweenActions,
            this.newBrowserHeadless);
          break;
        case 'Edge':
          newBrowser = new Edge(
            this.newBrowserName,
            this.newBrowserWidth,
            this.newBrowserHeight,
            this.newBrowserSleepTimeBetweenActions);
          break;
        case 'Firefox':
          newBrowser = new Firefox(
            this.newBrowserName,
            this.newBrowserWidth,
            this.newBrowserHeight,
            this.newBrowserSleepTimeBetweenActions);
          break;
        case 'InternetExplorer':
          newBrowser = new InternetExplorer(
            this.newBrowserName,
            this.newBrowserWidth,
            this.newBrowserHeight,
            this.newBrowserSleepTimeBetweenActions);
          break;
      }

      for (let i = 0; i < this.newBrowserNumberIterations; i++) {
        this.settings.browsers.push(newBrowser);
      }
      this.settingsService.saveSettings(this.settings);
    }
  }

  public onDeleteBrowser(browserToDelete: Browser): void {
    const browsers: Browser[] = [];
    for (const browser of this.settings.browsers) {
      if (browser.name !== browserToDelete.name) {
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

  getBrowserType(browser: Browser): string {
    return browser.constructor.name;
  }
}
