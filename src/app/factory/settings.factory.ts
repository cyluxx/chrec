import { Injectable } from '@angular/core';
import { Settings } from '../model/settings';
import { BrowserFactory } from './browser.factory';
import { Browser } from 'chrec-core/lib/model/browser/browser';

@Injectable()
export class SettingsFactory {

  constructor(private browserFactory: BrowserFactory) { }

  public fromStorageJson(parsedJson: any): Settings {
    const browsers: Browser[] = [];
    for (const browser of parsedJson.browsers) {
      browsers.push(this.browserFactory.fromStorageJson(browser));
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
