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
    return new Settings(
      'https://github.com/cyluxx/chrec',
      '',
      800,
      600,
      'http://localhost:4444/wd/hub',
      [new Chrome('default', 800, 600, false)]
    );
  }

  public resetSettings(): void {
    this.settingsDao.createOrUpdate('chrec-settings', this.newDefaultSettings());
  }

  public async readSettings(): Promise<Settings> {
    return this.settingsDao.read('chrec-settings');
  }

  public saveSettings(settings: Settings): void {
    this.settingsDao.createOrUpdate('chrec-settings', settings);
  }
}
