import { Component, Input } from "@angular/core";
import { Sequence } from "../../../../model/sequence";

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    @Input() sequence: Sequence;

    constructor(){

    }
}