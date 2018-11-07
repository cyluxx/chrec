import { Component, Output, EventEmitter, Input } from "@angular/core";

@Component({
    selector: 'action-comparison',
    templateUrl: './action-comparison.component.html'
})
export class ActionComparisonComponent{
    
    @Output() closeEmitter = new EventEmitter<boolean>();

    public onRecordAgain(): void {
        
    }

    public onClose(): void {
        this.closeEmitter.emit(true);
    }
}