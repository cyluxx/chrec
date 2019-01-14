import { Component, Input, EventEmitter, Output, OnInit } from "@angular/core";
import { Browser } from "../../../../model/browser";
import { Test } from "../../../../model/test";

@Component({
    selector: 'test-info',
    templateUrl: './test-info.component.html'
})
export class TestInfoComponent implements OnInit {

    @Input() test: Test;

    @Output() closeEmitter: EventEmitter<void> = new EventEmitter<void>();

    currentBrowser: Browser;

    ngOnInit(): void {
        if (this.test.browsers && this.test.browsers.length > 0) {
            this.currentBrowser = this.test.browsers[0];
        }
    }

    public onSelectBrowser(browser: Browser): void {
        this.currentBrowser = browser;
    }

    public onClose(): void {
        this.closeEmitter.emit();
    }
}