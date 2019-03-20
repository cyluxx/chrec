import { Component, Input } from '@angular/core';
import { Project } from 'chrec-core/lib/model/project';
import { ReplayService } from '../../../providers/replay.service';
import { Settings } from '../../../model/settings';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

  moreTestResults = false;
  @Input() project: Project;
  @Input() settings: Settings;

  constructor(private replayService: ReplayService) { }

  async onTestProject() {
    this.project = await this.replayService.testProject(this.project, this.settings);
  }

  onToggleMoreTestResults() {
    this.moreTestResults = !this.moreTestResults;
  }
}
