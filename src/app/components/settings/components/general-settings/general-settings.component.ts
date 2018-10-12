import { Component, Input } from "@angular/core";
import { Settings } from "../../../../model/settings";
import { NgForm } from "@angular/forms";
import { SettingsService } from "../../../../providers/settings.service";

@Component({
    selector: 'general-settings',
    templateUrl: './general-settings.component.html'
})
export class GeneralSettingsComponent {

    private settingsService: SettingsService;

    @Input() settings: Settings;

    constructor(settingsService: SettingsService) {
        this.settingsService = settingsService;
    }

    public onSubmit(form: NgForm): void {
        this.settings.homeUrl = form.value.homeUrl;
        this.settingsService.setSettings(this.settings);
    }

    public onReset(): void {
        this.settingsService.removeSettings();
    }
}