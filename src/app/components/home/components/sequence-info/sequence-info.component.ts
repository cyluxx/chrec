import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Sequence } from "../../../../model/sequence";
import { WebdriverService } from "../../../../providers/webdriver.service";
import { Settings } from "../../../../model/settings";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Test } from "../../../../model/test";
import { BrowserFactory } from "../../../../factory/browser.factory";

@Component({
    selector: 'sequence-info',
    templateUrl: './sequence-info.component.html'
})
export class SequenceInfoComponent {

    @Input() sequence: Sequence;

    @Input() settings: Settings;

    @Output() recordSequenceEmitter = new EventEmitter<Sequence>();

    @Output() rerecordSequenceEmitter = new EventEmitter<Sequence>();

    currentTest: Test;

    constructor(private webdriverService: WebdriverService, private modalService: NgbModal, private browserFactory: BrowserFactory) { }

    public onRecordSequence(): void {
        this.recordSequenceEmitter.emit(this.sequence);
    }

    public onRerecordSequence(): void {
        this.rerecordSequenceEmitter.emit(this.sequence);
    }

    public async onPlay(): Promise<void> {
        try {
            await this.webdriverService.runSequence(this.sequence, this.settings);
        }
        catch (error) {
            this.showReplayErrorModal(error);
        }
    }

    public showReplayErrorModal(errorMessage: string): void {
        const modalRef = this.modalService.open(ReplayErrorModal, { centered: true });
        modalRef.componentInstance.sequence = this.sequence;
        modalRef.componentInstance.errorMessage = errorMessage;
        modalRef.result.then(() => {
            this.onRerecordSequence();
        }, () => { });
    }

    public onCloseTest(): void {
        this.currentTest = null;
    }

    public onOpenTest(test: Test): void {
        this.currentTest = test;
    }
}

@Component({
    selector: 'replay-error-modal',
    templateUrl: './replay-error.modal.html'
})
export class ReplayErrorModal {
    @Input() sequence: Sequence;
    @Input() errorMessage: string;

    constructor(public activeModal: NgbActiveModal) { }
}