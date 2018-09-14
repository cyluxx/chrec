import { Component, Input, EventEmitter, Output } from "@angular/core";
import { Sequence } from "../../../../model/sequence";

@Component({
    selector: 'sequence-tabs',
    templateUrl: './sequence-tabs.component.html'
})
export class SequenceTabsComponent {

    newSequenceName: string;

    @Input() sequences: Sequence[];

    @Output() currentSequenceEmitter = new EventEmitter<Sequence>();

    public onSelectSequence(sequence: Sequence): void {
        this.currentSequenceEmitter.emit(sequence);
    }

    public onNewSequence(): void {
        if(this.newSequenceName){
            let sequence: Sequence = new Sequence();
            sequence.name = this.newSequenceName;
            sequence.actions = [];
            this.sequences.push(sequence);
            this.currentSequenceEmitter.emit(sequence);
            this.newSequenceName = '';
        }
    }
}