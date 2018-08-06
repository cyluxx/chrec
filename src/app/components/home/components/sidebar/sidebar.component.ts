import { Component, Input } from "@angular/core";
import { Action } from "../../../../model/action";

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    @Input() actions: Action[];

    constructor(){

    }
}