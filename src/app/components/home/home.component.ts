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
export class HomeComponent implements OnInit{
  
  private databaseService: DatabaseService;

  project: Project;
  currentSequence: Sequence;
  recorderState: RecorderState;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
    
    this.currentSequence = new Sequence();
    this.currentSequence.actions = [];
    this.recorderState = RecorderState.stop;
  }

  ngOnInit(): void {
    this.project = this.databaseService.getProject('default project');
    console.log(this.project);
    if(!this.project){
      this.project = new Project();
      this.project.name = 'default project'
      this.project.sequences = [];
    }
    console.log(this.project);
  }

  onAction(action: Action) {
    if (this.recorderState == RecorderState.record) {
      this.currentSequence.actions.push(action);
    }
  }

  onCurrentSequence(sequence: Sequence) {
    this.currentSequence = sequence;
  }

  onRecorderState(recorderState: RecorderState) {
    this.recorderState = recorderState;
  }

  onSave() {
    this.databaseService.setProject(this.project);
  }

  isRecording() {
    return this.recorderState == RecorderState.record;
  }

  onClearDatabase(){
    this.databaseService.clearProjects();
  }
}
