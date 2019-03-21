import { Component, Input } from '@angular/core';
import { ReplayService } from '../../../providers/replay.service';
import { Sequence } from 'chrec-core/lib/model/sequence';
import { Settings } from '../../../model/settings';

@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.scss']
})
export class SequenceComponent{

  moreTestResults = false;
  @Input() sequence: Sequence;
  @Input() settings: Settings;

  constructor(private replayService: ReplayService) { }

  onReRecordSequence() {
    
  }

  async onTestSequence() {
    this.sequence = await this.replayService.testSequence(this.sequence, this.settings);
  }

  onToggleMoreTestResults() {
    this.moreTestResults = !this.moreTestResults;
  }
}
