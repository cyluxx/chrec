import { Chrome } from 'chrec-core/lib/model/browser/chrome';
import { Injectable } from '@angular/core';
import { Settings } from '../model/settings';
import * as util from 'util';
import { set, get, getDefaultDataPath, DataOptions } from 'electron-json-storage';
import { Browser } from 'chrec-core/lib/model/browser/browser';
import { BrowserService } from './browser.service';

const CHREC_SETTINGS = 'chrec-settings';

@Injectable()
export class SettingsService {

  private set: (fileName: string, settings: Settings, options?: DataOptions, error?: any) => Promise<void>;
  private get: (fileName: string, options?: DataOptions, error?: any) => Promise<Settings>;

  constructor(private browserService: BrowserService) {
    this.set = util.promisify(set);
    this.get = util.promisify(get);

    console.log('%cDefault Settings Storage Data Path: ' + getDefaultDataPath(), 'color: #36f9c2; font-weight: bold');
  }

  public newDefaultSettings(): Settings {
    return new Settings(
      'https://github.com/cyluxx/chrec',
      '',
      800,
      600,
      'http://localhost:4444/wd/hub',
      [new Chrome('default', 800, 600, 0, false)]
    );
  }

  public async resetSettings(): Promise<void> {
    const settings = this.newDefaultSettings();
    await this.set(CHREC_SETTINGS, settings);
    console.log('%cCreate or Update ' + CHREC_SETTINGS, 'font-weight:bold; color:#42ff42');
    console.log(settings);
  }

  public async readSettings(): Promise<Settings> {
    const settings = await this.get(CHREC_SETTINGS) as Settings;
    const newSettings: Settings = this.reviveSettings(settings);
    console.log('%cRead ' + CHREC_SETTINGS, 'font-weight:bold; color:#42ff42');
    console.log(newSettings);
    return newSettings;
  }

  public async saveSettings(settings: Settings): Promise<void> {
    await this.set(CHREC_SETTINGS, settings);
    console.log('%cCreate or Update ' + CHREC_SETTINGS, 'font-weight:bold; color:#42ff42');
    console.log(settings);
  }

  public reviveSettings(parsedJson: any): Settings {
    const browsers: Browser[] = [];
    for (const browser of parsedJson.browsers) {
      browsers.push(this.browserService.reviveBrowser(browser));
    }
    return new Settings(
      parsedJson.homeUrl,
      parsedJson.recentlyOpenedPath,
      parsedJson.webviewWidth,
      parsedJson.webviewHeight,
      parsedJson.seleniumGridUrl,
      browsers
    );
  }
}
