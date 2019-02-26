import { Component, OnInit } from "@angular/core";
import { SettingsService } from "../../providers/settings.service";
import { Settings } from "../../model/settings";

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    //alexSettings: string = 'Alex Settings';
    generalSettings: string = 'General Settings';
    //stabilitySettings: string = 'Stability Settings';
    webdriverSettings: string = 'Webdriver Settings';

    //components: string[] = [this.alexSettings, this.generalSettings, this.stabilitySettings, this.webdriverSettings];
    components: string[] = [this.generalSettings, this.webdriverSettings];
    currentComponent: string = this.generalSettings;

    private settingsService: SettingsService;

    settings: Settings;

    constructor(settingsService: SettingsService) {
        this.settingsService = settingsService;

        this.settings = new Settings();
    }

    public async ngOnInit(): Promise<void> {
        this.settings = await this.settingsService.getDefaultSettings();
    }

    public onNavItem(component: string): void {
        this.currentComponent = component;
    }
}