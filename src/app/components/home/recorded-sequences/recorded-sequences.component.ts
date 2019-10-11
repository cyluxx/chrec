import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from 'chrec-core/lib/model/project';
import { Settings } from '../../../model/settings';
import { Sequence } from 'chrec-core/lib/model/sequence';

@Component({
  selector: 'app-recorded-sequences',
  templateUrl: './recorded-sequences.component.html',
  styleUrls: ['./recorded-sequences.component.scss']
})
export class RecordedSequencesComponent {

  @Input() project: Project;
  @Input() settings: Settings;

  @Output() projectEmitter = new EventEmitter<Project>();
  @Output() reRecordSequence = new EventEmitter<Sequence>();
  @Output() recordSequence = new EventEmitter<Sequence>();

  onDeleteSequence(sequence: Sequence) {
    this.project.sequences = this.project.sequences.filter(seq => seq !== sequence);
    this.projectEmitter.emit(this.project);
  }
}
