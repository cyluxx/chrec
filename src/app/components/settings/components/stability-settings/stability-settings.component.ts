import { Component, Input } from "@angular/core";
import { Settings } from "../../../../model/settings";

@Component({
    selector: 'stability-settings',
    templateUrl: './stability-settings.component.html'
})
export class StabilitySettingsComponent {

    @Input() settings: Settings;
}