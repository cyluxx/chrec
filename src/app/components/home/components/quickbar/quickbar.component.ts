import { Component, OnInit } from "@angular/core";
import { WebdriverioService } from "../../../../providers/webdriverio.service";

@Component({
    selector: 'quickbar',
    templateUrl: './quickbar.component.html',
    providers: [WebdriverioService],
})
export class QuickbarComponent implements OnInit {
    webdriverioService: WebdriverioService;

    constructor(webdriverioService: WebdriverioService){
        this.webdriverioService = webdriverioService;
    }

    ngOnInit(): void {
        this.onPlay();
    }

    onPlay() {
        
    }
}