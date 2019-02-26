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

  public async testSequence(sequence: Sequence, settings: UISettings): Promise<Sequence> {
    // TODO: Validation
    return await this.core.addSequenceTest(sequence, this.toCoreSettings(settings));
  }

  private toCoreSettings(settings: UISettings): CoreSettings {
    return new CoreSettings(settings.seleniumGridUrl, settings.browsers);
  }
}
