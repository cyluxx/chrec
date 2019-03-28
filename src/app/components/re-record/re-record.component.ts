import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Sequence } from 'chrec-core/lib/model/sequence';
import { Settings } from '../../model/settings';
import { Action } from 'chrec-core/lib/model/action/action';
import { GoTo } from 'chrec-core/lib/model/action/go-to';
import { Read } from 'chrec-core/lib/model/action/html-element-action/read';
import { Type } from 'chrec-core/lib/model/action/html-element-action/type';

@Component({
  selector: 'app-re-record',
  templateUrl: './re-record.component.html',
  styleUrls: ['./re-record.component.scss']
})
export class ReRecordComponent implements OnInit {

  @Input() sequence: Sequence;
  @Input() settings: Settings;

  @Output() cancel = new EventEmitter();
  @Output() submit = new EventEmitter();

  currentAction: Action;
  newSequence: Sequence;
  recorderActive = false;
  showBrowserWindow = false;

  public ngOnInit(): void {
    this.newSequence = new Sequence(this.sequence.getName(), []);
    this.currentAction = this.sequence.getActions()[0];
  }

  public onSubmit(): void {
    this.sequence.setActions(this.newSequence.getActions());
    this.submit.emit();
  }

  public onNextAction(): void {
    if (this.sequence.getActions().length > this.newSequence.getActions().length) {
      this.currentAction = this.sequence.getActions()[this.newSequence.getActions().length];
    } else {
      this.currentAction = null;
    }
    this.showBrowserWindow = false;
  }

  public isGoTo(action: Action): boolean {
    return action instanceof GoTo;
  }

  public asGoTo(action: Action): GoTo {
    return action as GoTo;
  }

  public isRead(action: Action): boolean {
    return action instanceof Read;
  }

  public asRead(action: Action): Read {
    return action as Read;
  }

  public isType(action: Action): boolean {
    return action instanceof Type;
  }

  public asType(action: Action): Type {
    return action as Type;
  }
}
