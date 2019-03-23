import { Injectable } from '@angular/core';
import { Settings } from '../model/settings';
import * as util from 'util';
import { set, get, remove, getDefaultDataPath, DataOptions } from 'electron-json-storage';
import { SettingsFactory } from '../factory/settings.factory';

const CHREC_SETTINGS = 'chrec-settings';

@Injectable()
export class SettingsDao implements Dao<Settings> {

  private set: (fileName: string, settings: Settings, options?: DataOptions, error?: any) => Promise<void>;
  private get: (fileName: string, options?: DataOptions, error?: any) => Promise<Settings>;
  private remove: (fileName: string, options?: DataOptions, error?: any) => Promise<void>;

  constructor(private settingsFactory: SettingsFactory) {
    this.set = util.promisify(set);
    this.get = util.promisify(get);
    this.remove = util.promisify(remove);

    console.log('%cDefault Settings Storage Data Path: ' + getDefaultDataPath(), 'color: #36f9c2; font-weight: bold');
  }

  public async createOrUpdate(fileName: string, settings: Settings, path?: string): Promise<any> {
    if (path) {
      await this.set(CHREC_SETTINGS, settings, { dataPath: path });
    }
    await this.set(CHREC_SETTINGS, settings);
    console.log('%cCreate or Update ' + CHREC_SETTINGS, 'font-weight:bold; color:#42ff42');
    console.log(settings);
  }

  public async read(fileName: string, path?: string): Promise<Settings> {
    let settings: any;
    if (path) {
      settings = await this.get(CHREC_SETTINGS, { dataPath: path }) as Settings;
    } else {
      settings = await this.get(CHREC_SETTINGS) as Settings;
    }
    const newSettings: Settings = this.settingsFactory.fromStorageJson(settings);
    console.log('%cRead ' + CHREC_SETTINGS, 'font-weight:bold; color:#42ff42');
    console.log(settings);
    return newSettings;
  }

  public async delete(fileName: string, path?: string): Promise<any> {
    if (path) {
      await this.remove(CHREC_SETTINGS, { dataPath: path });
    }
    await this.remove(CHREC_SETTINGS);
    console.log('%cDelete ' + CHREC_SETTINGS, 'font-weight:bold; color:#42ff42');
  }
}
