import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Sequence } from "../../../../model/sequence";
import { Action } from "../../../../model/action";
import { WebdriverService } from "../../../../providers/webdriver.service";
import { Settings } from "../../../../model/settings";
import { Browser, Type as BrowserType } from "../../../../model/browser";

@Component({
    selector: 'sequence-info',
    templateUrl: './sequence-info.component.html'
})
export class SequenceInfoComponent {

    webdriverService: WebdriverService;

    @Input() sequence: Sequence;

    @Input() settings: Settings;

    @Input() currentAction: Action;

    @Output() recordSequenceEmitter = new EventEmitter<Sequence>();

    @Output() rerecordSequenceEmitter = new EventEmitter<Sequence>();

    currentBrowser: Browser;

    currentActionIndex: number = 0;

    showNewBrowserCard: boolean;
    browserTypes: string[];
    newBrowser: Browser;

    constructor(webdriverService: WebdriverService) {
        this.webdriverService = webdriverService;
        this.browserTypes = Object.keys(BrowserType);
        this.newBrowser = new Browser();
    }

    public onRecordSequence(): void {
        this.recordSequenceEmitter.emit(this.sequence);
    }

    public onRerecordSequence(): void {
        this.rerecordSequenceEmitter.emit(this.sequence);
    }

    public async onPlay(): Promise<void> {
        this.sequence.tested = true;
        try {
            await this.webdriverService.runAllBrowsers(this.sequence, this.settings);
            this.sequence.executable = true;
        }
        catch (error) {
            if (error.name === 'NoSuchElementError') {
                this.sequence.executable = false;
            }
        }
    }

    public onSelectBrowser(browser: Browser): void {
        this.showNewBrowserCard = false;
        this.currentBrowser = browser;
    }

    public onAddNewBrowser(): void {
        this.currentBrowser = null;
        this.showNewBrowserCard = !this.showNewBrowserCard;
    }

    public onConfirmNewBrowser(): void {
        if (this.newBrowser.type && this.newBrowser.width >= 300 && this.newBrowser.height >= 300) {

            //check if name allready exists
            for (let browser of this.sequence.browsers) {
                if (this.newBrowser.name === browser.name) {
                    return;
                }
            }

            this.sequence.browsers.push(this.newBrowser);
            this.currentBrowser = this.newBrowser;
            this.newBrowser = new Browser();
            this.showNewBrowserCard = false;
        }
    }

    public onAbortNewBrowser(): void {
        this.newBrowser = new Browser();
        this.showNewBrowserCard = false;
    }

    public shouldDisplayHeadlessCheckbox(): boolean {
        return this.newBrowser.type && this.newBrowser.type === BrowserType.chrome;
    }

    public onCurrentActionIndex(currentActionIndex: number): void {
        this.currentActionIndex = currentActionIndex;
    }
}