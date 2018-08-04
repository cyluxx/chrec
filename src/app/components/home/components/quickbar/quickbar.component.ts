import { Component, OnInit } from "@angular/core";
import { WebdriverioService } from "../../../../providers/webdriverio.service";
import { SeleniumService } from "../../../../providers/selenium.service";

@Component({
    selector: 'quickbar',
    templateUrl: './quickbar.component.html',
    providers: [SeleniumService],
})
export class QuickbarComponent implements OnInit {
    seleniumService: SeleniumService;

    constructor(seleniumService: SeleniumService){
        this.seleniumService = seleniumService;
    }

    ngOnInit(): void {
        this.onPlay();
    }

    onPlay() {
        this.seleniumService.test();
    }
}