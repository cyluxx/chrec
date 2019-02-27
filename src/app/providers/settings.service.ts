import { Injectable } from "@angular/core";
import { Settings } from "../model/settings";
import { SettingsDao } from "../dao/settings.dao";
import { Chrome } from 'chrec-core/lib/model/browser/chrome';

const DEFAULT_SETTINGS = 'settings';

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

    public async getDefaultSettings(): Promise<Settings> {
        return this.settingsDao.read(DEFAULT_SETTINGS);
    }

    public setDefaultSettings(settings: Settings): void {
        this.settingsDao.createOrUpdate(DEFAULT_SETTINGS, settings);
    }

    public resetDefaultSettings(): void {
        const settings: Settings = new Settings();
        this.buildDefaultSettings(settings);
        this.setDefaultSettings(settings);
    }

    private buildDefaultSettings(settings: Settings): void {
        // General Settings
        settings.seleniumGridUrl = 'localhost:4444';
        settings.webviewWidth = 800;
        settings.webviewHeight = 600;

        // Webdriver Settings
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