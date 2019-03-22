import { Injectable } from '@angular/core';
import { Settings } from '../model/settings';
import { SettingsDao } from '../dao/settings.dao';
import { Chrome } from 'chrec-core/lib/model/browser/chrome';

@Injectable()
export class SettingsService {

  private settingsDao: SettingsDao;

  constructor(settingsDao: SettingsDao) {
    this.settingsDao = settingsDao;
  }

  public newDefaultSettings(): Settings {
    const settings: Settings = new Settings();
    this.buildDefaultSettings(settings);
    return settings;
  }

  public async readSettings(): Promise<Settings> {
    return this.settingsDao.read('chrec-settings');
  }

  public saveSettings(settings: Settings): void {
    this.settingsDao.createOrUpdate('chrec-settings', settings);
  }

  private buildDefaultSettings(settings: Settings): void {
    // General Settings
    // settings.homeUrl = '';
    settings.recentlyOpenedPath = '';
    // settings.webviewWidth = 800;
    // settings.webviewHeight = 600;

    // Webdriver Settings
    settings.seleniumGridUrl = 'localhost:4444';
    settings.browsers = [new Chrome('default', 800, 600, false)];

    // Stability Settings
    // settings.useCssSelectorGenerator = true;
    // settings.useFinder = true;
    // settings.useGetQuerySelector = true;
    // settings.useOptimalSelect = true;
    // settings.useSelectorQuery = true;
    // settings.useBoundingBox = true;
    // settings.useBoundingBoxTransposition = true;
    // settings.useTemplateMatching = true;
    // settings.useFeatureMatching = true;

    // Alex Settings
    // settings.alexUrl = 'localhost:8000';
    // settings.alexEmail = 'admin@alex.example';
    // settings.alexPassword = 'admin';
  }
}
