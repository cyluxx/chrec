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
    return new Settings();
  }

  public async readSettings(): Promise<Settings> {
    return this.settingsDao.read('chrec-settings');
  }

  public saveSettings(settings: Settings): void {
    this.settingsDao.createOrUpdate('chrec-settings', settings);
  }
}
