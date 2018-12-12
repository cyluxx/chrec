import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Sequence } from "../../../../model/sequence";
import { Action } from "../../../../model/action";
import { WebdriverService } from "../../../../providers/webdriver.service";
import { Settings } from "../../../../model/settings";
import { Browser } from "../../../../model/browser";

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

    constructor(webdriverService: WebdriverService) {
        this.webdriverService = webdriverService;
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
        this.currentBrowser = browser;
    }
}