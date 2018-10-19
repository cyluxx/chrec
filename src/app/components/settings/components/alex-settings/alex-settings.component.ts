import { Component, Input } from "@angular/core";
import { Settings } from "../../../../model/settings";
import { NgForm } from "@angular/forms";
import { SettingsService } from "../../../../providers/settings.service";

@Component({
    selector: 'alex-settings',
    templateUrl: './alex-settings.component.html'
})
export class AlexSettingsComponent {

    private settingsService: SettingsService;

    @Input() settings: Settings;

    constructor(settingsService: SettingsService) {
        this.settingsService = settingsService;
    }

    public onSubmit(form: NgForm): void {
        this.settings.alexUrl = form.value.alexUrl;
        this.settings.alexEmail = form.value.alexEmail;
        this.settings.alexPassword = form.value.alexPassword;
        this.settingsService.setSettings(this.settings);
    }
}