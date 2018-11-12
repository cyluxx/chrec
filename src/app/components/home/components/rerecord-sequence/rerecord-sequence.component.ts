import { Component, Output, EventEmitter, Input } from "@angular/core";

@Component({
    selector: 'rerecord-sequence',
    templateUrl: './rerecord-sequence.component.html'
})
export class RerecordSequenceComponent{
    
    @Output() closeEmitter = new EventEmitter<boolean>();

    public onRecordAgain(): void {
        
    }

    public onClose(): void {
        this.closeEmitter.emit(true);
    }
}