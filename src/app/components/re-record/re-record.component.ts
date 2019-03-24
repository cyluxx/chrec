import { Component, OnInit, Input } from '@angular/core';
import { Sequence } from 'chrec-core/lib/model/sequence';
import { Settings } from '../../model/settings';

@Component({
  selector: 'app-re-record',
  templateUrl: './re-record.component.html',
  styleUrls: ['./re-record.component.scss']
})
export class ReRecordComponent {

  @Input() sequence: Sequence;
  @Input() settings: Settings;

  constructor() { }

}
