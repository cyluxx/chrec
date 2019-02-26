import { Injectable } from '@angular/core';
import { Settings } from '../model/settings';
import * as util from 'util';
import { set, get, remove, getDefaultDataPath, DataOptions } from 'electron-json-storage';

@Injectable()
export class SettingsDao implements Dao<Settings>{

    private set: (fileName: string, settings: Settings, options?: DataOptions, error?: any) => Promise<void>;
    private get: (fileName: string, options?: DataOptions, error?: any) => Promise<Settings>;
    private remove: (fileName: string, options?: DataOptions, error?: any) => Promise<void>;

    constructor() {
        this.set = util.promisify(set);
        this.get = util.promisify(get);
        this.remove = util.promisify(remove);

        console.log('%cDefault Settings Storage Data Path: ' + getDefaultDataPath(), 'color: #36f9c2; font-weight: bold');
    }

    public async createOrUpdate(fileName: string, settings: Settings, path?: string): Promise<any> {
        console.log('%cCreate or Update ' + fileName, 'font-weight:bold; color:#42ff42');
        console.log(settings);
        if (path) {
            return await this.set(fileName, settings, { dataPath: path });
        }
        return await this.set(fileName, settings);
    }

    public async read(fileName: string, path?: string): Promise<Settings> {
        console.log('%cRead ' + fileName, 'font-weight:bold; color:#42ff42');
        let settings: Settings;
        if (path) {
            settings = await this.get(fileName, { dataPath: path }) as Settings;
        }
        else {
            settings = await this.get(fileName) as Settings;
        }
        console.log(settings);
        return settings;
    }

    public async delete(fileName: string, path?: string): Promise<any> {
        console.log('%cDelete ' + fileName, 'font-weight:bold; color:#42ff42');
        if (path) {
            return await this.remove(fileName, { dataPath: path });
        }
        return await this.remove(fileName);
    }
}