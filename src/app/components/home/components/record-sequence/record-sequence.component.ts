import { Component, Output, EventEmitter, Input } from "@angular/core";
import { Sequence } from "../../../../model/sequence";
import { Settings } from "../../../../model/settings";

@Component({
    selector: 'record-sequence',
    templateUrl: './record-sequence.component.html'
})
export class RecordSequenceComponent{
    
    @Input() sequence: Sequence;

    @Input() settings: Settings;

    @Output() submitEmitter: EventEmitter<void> = new EventEmitter<void>();

    public onSubmit(): void {
        this.submitEmitter.emit();
    }
}