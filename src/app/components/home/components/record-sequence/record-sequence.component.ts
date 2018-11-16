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

    @Output() stopRecordingEmitter: EventEmitter<void>;

    constructor() {
        this.stopRecordingEmitter = new EventEmitter<void>();
    }

    public onStopRecording(): void {
        this.stopRecordingEmitter.emit();
    }
}