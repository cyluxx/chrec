import { Component, Input } from "@angular/core";
import { RecorderState } from "../../../../model/recorder-state";

@Component({
    selector: 'statusbar',
    templateUrl: './statusbar.component.html'
})
export class StatusbarComponent {
    
    @Input() recorderState: RecorderState;
}