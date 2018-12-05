import { Injectable } from "@angular/core";
import { Settings } from "../model/settings";
import { Browser, Type } from "../model/browser";
import { SettingsDao } from "../dao/settings.dao";

const DEFAULT_SETTINGS = 'settings';

@Injectable()
export class SettingsService {

    private settingsDao: SettingsDao;

    constructor(settingsDao: SettingsDao) {
        this.settingsDao = settingsDao;
    }

    public newDefaultSettings(): Settings {
        let settings: Settings = new Settings();
        settings = this.buildDefaultSettings(settings);
        return settings;
    }

    public async getDefaultSettings(): Promise<Settings> {
        return this.settingsDao.read(DEFAULT_SETTINGS);
    }

    public setDefaultSettings(settings: Settings): void {
        this.settingsDao.create(DEFAULT_SETTINGS, settings);
    }

    public resetDefaultSettings(): void {
        let settings: Settings = new Settings();
        settings = this.buildDefaultSettings(settings);
        this.setDefaultSettings(settings);
    }

    private buildDefaultSettings(settings: Settings): Settings {
        //General Settings
        settings.seleniumGridUrl = 'localhost:4444';
        settings.webviewWidth = 800;
        settings.webviewHeight = 600;

        //Webdriver Settings
        settings.browsers = [];
        let browser: Browser = new Browser();
        browser.type = Type.chrome;
        browser.width = 800;
        browser.height = 600;
        browser.headless = false;
        settings.browsers.push(browser);
        settings.numberIterations = 1;

        //Stability Settings
        settings.useCssSelectorGenerator = true;
        settings.useFinder = true;
        settings.useGetQuerySelector = true;
        settings.useOptimalSelect = true;
        settings.useSelectorQuery = true;
        settings.useBoundingBox = true;
        settings.useBoundingBoxTransposition = true;
        settings.useTemplateMatching = true;
        settings.useFeatureMatching = true;

        //Alex Settings
        settings.alexUrl = 'localhost:8000';
        settings.alexEmail = 'admin@alex.example';
        settings.alexPassword = 'admin';

        return settings;
    }
}