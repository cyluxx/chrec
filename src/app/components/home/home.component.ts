import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProjectActions from '../../redux/actions/project.actions';
import { AppState } from '../../redux/app-state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  projectName: string = 'test';

  constructor(private store: Store<AppState>) { }

  create() {
    this.store.dispatch(new ProjectActions.Create(this.projectName));
  }
}
