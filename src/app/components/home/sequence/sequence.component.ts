import { Component, Input } from '@angular/core';
import { ReplayService } from '../../../providers/replay.service';
import { Sequence } from 'chrec-core/lib/model/sequence';
import { Settings } from '../../../model/settings';
import { Action } from 'chrec-core/lib/model/action/action';

@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.scss']
})
export class SequenceComponent {

  @Input() sequence: Sequence;
  @Input() settings: Settings;

  currentAction: Action;
  moreTestResults = false;

  constructor(private replayService: ReplayService) { }

  onReRecordSequence() {

  }

  async onTestSequence() {
    this.sequence = await this.replayService.testSequence(this.sequence, this.settings);
  }
}
