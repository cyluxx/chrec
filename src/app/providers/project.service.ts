import * as path from 'path';
import { Core } from 'chrec-core';
import { Injectable } from '@angular/core';
import { Project } from 'chrec-core/lib/model/project';

@Injectable()
export class ProjectService {

  private core: Core = new Core();

  constructor() { }

  public newProject(name: string): Project {
    return new Project(name, [], []);
  }

  public async readProject(absolutePath: string): Promise<Project> {
    return this.core.importChrecJson(path.resolve(absolutePath));
  }

  public saveProject(project: Project, absolutePath: string): void {
    this.core.exportChrecJson(project, path.resolve(absolutePath));
  }

  public exportAlexJson(project: Project, absolutePath: string): void {
    this.core.exportAlexJson(project, path.resolve(absolutePath));
  }
}
