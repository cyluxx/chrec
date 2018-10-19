import { Injectable } from "@angular/core";
import { Settings } from "../model/settings";
import * as util from 'util';
import { Browser, Type } from "../model/browser";
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

    public resetSettings(): void {
        let settings: Settings = new Settings();

        settings.seleniumGridUrl = 'localhost:4444';

        settings.browsers = [];
        let browser: Browser = new Browser();
        browser.type = Type.chrome;
        browser.width = 1920;
        browser.height = 1080;
        settings.browsers.push(browser);

        settings.numberIterations = 1;

        settings.useCssSelectorGenerator = true;
        settings.useFinder = true;
        settings.useGetQuerySelector = true;
        settings.useOptimalSelect = true;
        settings.useSelectorQuery = true;
        settings.useBoundingBox = true;
        settings.useTemplateMatching = true;
        settings.useFeatureMatching = true;

        settings.alexUrl = 'localhost:8000';
        settings.alexEmail = 'admin@alex.example';
        settings.alexPassword = 'admin';

        this.setSettings(settings);
    }
}