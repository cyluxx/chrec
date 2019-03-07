import { Component } from '@angular/core';
import { Project } from 'chrec-core/lib/model/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

  projectName: string;

  constructor() { }
}
