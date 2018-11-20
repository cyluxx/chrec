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
        this.settings.numberIterations = form.value.numberIterations;
        this.settingsService.setSettings(this.settings);
    }

    public onAddBrowser(): void {
        if (this.newBrowser.type && this.newBrowser.width >= 300 && this.newBrowser.height >= 300) {
            this.settings.browsers.push(this.newBrowser);
            this.newBrowser = new Browser();
            this.settingsService.setSettings(this.settings);
        }
    }

    public onDeleteBrowser(browser: Browser): void {
        let browsers: Browser[] = [];
        for(let thisBrowser of this.settings.browsers){
            if(thisBrowser.type !== browser.type 
                || thisBrowser.width !== browser.width 
                || thisBrowser.height !== browser.height
                || thisBrowser.headless !== browser.headless){
                browsers.push(thisBrowser);
            }
        }
        this.settings.browsers = browsers;
        this.settingsService.setSettings(this.settings);
    }

    public shouldDisplayHeadlessCheckbox(): boolean{
        return this.newBrowser.type && this.newBrowser.type === Type.chrome;
    }
}