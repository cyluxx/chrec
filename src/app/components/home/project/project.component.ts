import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Project } from 'chrec-core/lib/model/project';
import { Observable } from 'rxjs';
import * as ProjectActions from '../../../redux/actions/project.actions';
import { AppState } from '../../../redux/app-state';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

  project: Observable<Project>;

  projectName: string;

  constructor(private store: Store<AppState>) {
    this.project = this.store.select('project');
  }

  editName() {
    this.store.dispatch(new ProjectActions.EditName(this.projectName));
  }
}
