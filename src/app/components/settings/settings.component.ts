import { Component } from "@angular/core";

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent {
    generalSettings: string = 'General Settings';
    stabilitySettings: string = 'Stability Settings';
    webdriverSettings: string = 'Webdriver Settings';

    components: string[] = [this.generalSettings, this.stabilitySettings, this.webdriverSettings];
    currentComponent: string = this.generalSettings;

    public onNavItem(component: string): void {
        this.currentComponent = component;
    }
}