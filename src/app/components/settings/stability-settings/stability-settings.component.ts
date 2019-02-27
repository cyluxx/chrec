import { Component, Input } from "@angular/core";
import { Settings } from "../../../../model/settings";
import { SettingsService } from "../../../../providers/settings.service";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'stability-settings',
    templateUrl: './stability-settings.component.html'
})
export class StabilitySettingsComponent {

    private settingsService: SettingsService;

    @Input() settings: Settings;

    constructor(settingsService: SettingsService) {
        this.settingsService = settingsService;
    }

    public onSubmit(form: NgForm): void {
        this.settings.useCssSelectorGenerator = form.value.useCssSelectorGenerator;
        this.settings.useFinder = form.value.useFinder;
        this.settings.useGetQuerySelector = form.value.useGetQuerySelector;
        this.settings.useOptimalSelect = form.value.useOptimalSelect;
        this.settings.useSelectorQuery = form.value.useSelectorQuery;
        this.settings.useBoundingBox = form.value.useBoundingBox;
        this.settings.useTemplateMatching = form.value.useTemplateMatching;
        this.settings.useFeatureMatching = form.value.useFeatureMatching;
        this.settingsService.setDefaultSettings(this.settings);
    }
}