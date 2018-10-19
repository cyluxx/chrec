import { Component, OnInit } from "@angular/core";
import { SettingsService } from "../../providers/settings.service";
import { Settings } from "../../model/settings";

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    generalSettings: string = 'General Settings';
    stabilitySettings: string = 'Stability Settings';
    webdriverSettings: string = 'Webdriver Settings';

    components: string[] = [this.generalSettings, this.stabilitySettings, this.webdriverSettings];
    currentComponent: string = this.generalSettings;

    private settingsService: SettingsService;

    settings: Settings;

    constructor(settingsService: SettingsService) {
        this.settingsService = settingsService;

        this.settings = new Settings();
    }

    public ngOnInit(): void {
        this.settingsService.getSettings()
            .then((settings: Settings) => {
                if (settings) {
                    this.settings = settings;
                    if(!settings.browsers){
                        this.settings.browsers = [];
                    }
                }
            });
    }

    public onNavItem(component: string): void {
        this.currentComponent = component;
    }
}