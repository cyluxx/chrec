import { Component, OnInit } from '@angular/core';
import { Action } from '../../model/action';
import { RecorderState } from '../../model/recorder-state';
import { DatabaseService } from '../../providers/database.service';
import { Project } from '../../model/project';
import { Sequence } from '../../model/sequence';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private databaseService: DatabaseService;

  project: Project;
  currentSequence: Sequence;
  recorderState: RecorderState;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
    this.project = new Project();
    this.project.sequences = [];
    this.currentSequence = new Sequence();
    this.currentSequence.actions = [];
    this.recorderState = RecorderState.stop;
  }

  onAction(action: Action) {
    if (this.recorderState == RecorderState.record) {
      this.currentSequence.actions.push(action);
    }
  }

  onCurrentSequence(sequence: Sequence){
    this.currentSequence = sequence;
  }

  onRecorderState(recorderState: RecorderState) {
    this.recorderState = recorderState;
  }

  isRecording(){
    return this.recorderState == RecorderState.record;
  }
}
