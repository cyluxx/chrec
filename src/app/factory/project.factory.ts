import { Injectable } from '@angular/core';
import { Project } from 'chrec-core/lib/model/project';
import { ModelFactory } from 'chrec-core/lib/factory/model.factory';

@Injectable()
export class ProjectFactory {

  private modelFactory: ModelFactory = new ModelFactory();

  public fromStorageJson(parsedJson: any): Project {
    return this.modelFactory.projectFromChrecJson(parsedJson);
  }
}
