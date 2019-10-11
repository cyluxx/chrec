import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Sequence } from 'chrec-core/lib/model/sequence';
import { Settings } from '../../model/settings';
import { Action } from 'chrec-core/lib/model/action/action';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  @Input() sequence: Sequence;
  @Input() settings: Settings;

  @Output() cancel = new EventEmitter();
  @Output() submit = new EventEmitter();

  newSequence: Sequence;

  public ngOnInit(): void {
    this.newSequence = new Sequence(this.sequence.name, []);
  }

  getActionName(action: Action) {
    return action.constructor.name;
  }

  public onSubmit(): void {
    this.sequence.actions = this.newSequence.actions;
    this.submit.emit();
  }
}
