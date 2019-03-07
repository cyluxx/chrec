import { Core } from 'chrec-core';
import { Injectable } from '@angular/core';
import { ProjectDao } from '../dao/project.dao';
import { Project } from 'chrec-core/lib/model/project';

@Injectable()
export class ProjectService {

  private projectDao: ProjectDao;
  private core: Core = new Core();

  constructor(projectDao: ProjectDao) {
    this.projectDao = projectDao;
  }

  public newProject(name: string): Project {
    return new Project(name, [], []);
  }

  public async readProject(fileName: string, absolutePath?: string): Promise<Project> {
    return this.projectDao.read(fileName, absolutePath);
  }

  public saveProject(project: Project, absolutePath?: string): void {
    this.projectDao.createOrUpdate(project, absolutePath);
  }

  public exportToAlexJson(project: Project, dirName: string): void {
    // TODO: Validation
    this.core.exportToAlexJson(project, dirName);
  }

  public exportToChrecJson(project: Project, dirName: string): void {
    // TODO: Validation
    this.core.exportToChrecJson(project, dirName);
  }

  public async  importFromChrecJson(absolutePath: string): Promise<Project> {
    // TODO: Validation
    return this.core.importFromChrecJson(absolutePath);
  }
}
