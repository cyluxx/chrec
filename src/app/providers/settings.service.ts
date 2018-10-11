import { Injectable } from "@angular/core";
import { Settings } from "../model/settings";
import * as util from 'util';
const storage = require('electron-json-storage');
const SETTINGS = 'settings';

@Injectable()
export class SettingsService {

    private get: (key: String) => Promise<Settings>;

    constructor() {
        this.get = util.promisify(storage.get);
    }

    public setSettings(settings: Settings): void {
        storage.set(SETTINGS, settings, (error) => {
            if (error) throw error;
        });
    }

    public async getSettings(): Promise<Settings> {
        return await this.get(SETTINGS);
    }

    public removeSettings(): void {
        storage.remove(SETTINGS, (error) => {
            if (error) throw error;
        });
    }
}