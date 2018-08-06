import { Component, OnInit } from '@angular/core';
import { Action } from '../../model/action';
import { RecorderState } from '../../model/recorder-state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  actions: Action[];
  recorderState: RecorderState;

  constructor() {
    this.actions = [];
    this.recorderState = RecorderState.stop;
  }

  onAction(action: Action) {
    if (this.recorderState == RecorderState.record) {
      this.actions.push(action);
    }
  }

  onRecorderState(recorderState: RecorderState) {
    this.recorderState = recorderState;
    if (this.recorderState == RecorderState.stop) {
      this.actions = [];
    }
  }

  isRecording(){
    return this.recorderState == RecorderState.record;
  }
}
