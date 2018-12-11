import { Component, Input } from "@angular/core";
import { Settings } from "../../../../model/settings";
import { SettingsService } from "../../../../providers/settings.service";
import { Browser, Type } from "../../../../model/browser";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'webdriver-settings',
    templateUrl: './webdriver-settings.component.html'
})
export class WebdriverSettingsComponent {

    private settingsService: SettingsService;

    @Input() settings: Settings;

    types: string[];
    newBrowser: Browser;

    constructor(settingsService: SettingsService) {
        this.settingsService = settingsService;
        this.types = Object.keys(Type);
        this.newBrowser = new Browser();
    }

    public onSubmit(form: NgForm): void {
        this.settings.seleniumGridUrl = form.value.seleniumGridUrl;
        this.settingsService.setDefaultSettings(this.settings);
    }

    public onAddBrowser(): void {
        if (this.newBrowser.type && this.newBrowser.width >= 300 && this.newBrowser.height >= 300) {

            //check if name allready exists
            for (let browser of this.settings.browsers) {
                if (this.newBrowser.name === browser.name) {
                    return;
                }
            }

            this.settings.browsers.push(this.newBrowser);
            this.newBrowser = new Browser();
            this.settingsService.setDefaultSettings(this.settings);
        }
    }

    public onDeleteBrowser(browser: Browser): void {
        let browsers: Browser[] = [];
        for (let thisBrowser of this.settings.browsers) {
            if (thisBrowser.name !== browser.name) {
                browsers.push(thisBrowser);
            }
        }
        this.settings.browsers = browsers;
        this.settingsService.setDefaultSettings(this.settings);
    }

    public shouldDisplayHeadlessCheckbox(): boolean {
        return this.newBrowser.type && this.newBrowser.type === Type.chrome;
    }
}