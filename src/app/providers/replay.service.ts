import { Injectable } from '@angular/core';
import { Core } from 'chrec-core';
import { Project } from 'chrec-core/lib/model/project';
import { Settings as CoreSettings } from 'chrec-core/lib/model/settings';
import { Sequence } from 'chrec-core/lib/model/sequence';
import { Settings as UISettings } from '../model/settings';

@Injectable()
export class ReplayService {
  private core: Core = new Core();

  public async testProject(project: Project, settings: UISettings): Promise<Project> {
    // TODO: Validation
    return await this.core.addProjectTest(project, this.toCoreSettings(settings));
  }

  public async testSequence(project: Project, sequence: Sequence, settings: UISettings): Promise<Project> {
    // TODO: Validation
    return await this.core.addSequenceTest(project, sequence, this.toCoreSettings(settings));
  }

  public setRecommendedLocators(project: Project): void {
    this.core.setRecommendedLocators(project);
  }

  private toCoreSettings(settings: UISettings): CoreSettings {
    return new CoreSettings(settings.seleniumGridUrl, settings.browsers);
  }
}
