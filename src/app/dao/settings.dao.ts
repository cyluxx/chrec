import { Injectable } from "@angular/core";
import { Settings } from "../model/settings";
import * as util from 'util';
import * as storage from 'electron-json-storage';

@Injectable()
export class SettingsDao implements Dao<Settings>{

    private set: (fileName: string, object: object, options?: object) => Promise<void>;
    private get: (fileName: string, options?: object) => Promise<Settings>;
    private remove: (fileName: string, options?: object) => Promise<void>;

    constructor() {
        this.set = util.promisify(storage.set);
        this.get = util.promisify(storage.get);
        this.remove = util.promisify(storage.remove);

        console.log('%c Default Settings Storage Data Path: ' + storage.getDefaultDataPath(), 'color: #36f9c2; font-weight: bold');
    }

    public async create(fileName: string, settings: Settings, path?: string): Promise<any> {
        console.log('%c Create ' + fileName, 'font-weight:bold; color:#42ff42');
        console.log(settings);
        return await this.update(fileName, settings, path);
    }

    public async read(fileName: string, path?: string): Promise<Settings> {
        console.log('%c Read ' + fileName, 'font-weight:bold; color:#42ff42');
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

    public async update(fileName: string, settings: Settings, path?: string): Promise<any> {
        console.log('%c Update ' + fileName, 'font-weight:bold; color:#42ff42');
        console.log(settings);
        if (path) {
            return await this.set(fileName, settings, { dataPath: path });
        }
        return await this.set(fileName, settings);
    }

    public async delete(fileName: string, path?: string): Promise<any> {
        console.log('%c Delete ' + fileName, 'font-weight:bold; color:#42ff42');
        if (path) {
            return await this.remove(fileName, { dataPath: path });
        }
        return await this.remove(fileName);
    }
}