import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sequence } from 'chrec-core/lib/model/sequence';
import { Settings } from '../../model/settings';
import { Action } from 'chrec-core/lib/model/action/action';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent {

  @Input() sequence: Sequence;
  @Input() settings: Settings;

  @Output() submit = new EventEmitter();

  recorderActive = false;

  getActionName(action: Action) {
    return action.constructor.name;
  }
}
