import { Component } from "@angular/core";
import { WebdriverService } from "../../../../service/webdriver.service";

@Component({
    selector: 'quickbar',
    templateUrl: './quickbar.component.html'
})
export class QuickbarComponent {
    private webdriverService: WebdriverService;

    constructor(webdriverService: WebdriverService){
        this.webdriverService = webdriverService;
    }
    
    onPlay(){
        this.webdriverService.test();
    }
}