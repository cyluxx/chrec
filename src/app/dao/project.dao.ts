import { Injectable } from '@angular/core';
import * as util from 'util';
import { set, get, remove, getDefaultDataPath, DataOptions } from 'electron-json-storage';
import { Project } from 'chrec-core/lib/model/project';
import { ProjectFactory } from '../factory/project.factory';

@Injectable()
export class ProjectDao implements Dao<Project> {

  private set: (fileName: string, project: Project, options?: DataOptions, error?: any) => Promise<void>;
  private get: (fileName: string, options?: DataOptions, error?: any) => Promise<Project>;
  private remove: (fileName: string, options?: DataOptions, error?: any) => Promise<void>;

  constructor(private projectFactory: ProjectFactory) {
    this.set = util.promisify(set);
    this.get = util.promisify(get);
    this.remove = util.promisify(remove);

    console.log('%cDefault Project Storage Data Path: ' + getDefaultDataPath(), 'color: #36f9c2; font-weight: bold');
  }

  public async createOrUpdate(project: Project, path?: string): Promise<void> {
    console.log(`%cCreate or Update ${project.getName()} at ${path}`, 'font-weight:bold; color:#42ff42');
    console.log(project);
    if (path) {
      return await this.set(project.getName(), project, { dataPath: path });
    }
    return await this.set(project.getName(), project);
  }

  public async read(fileName: string, path?: string): Promise<Project> {
    console.log(`%cRead ${fileName} at ${path}`, 'font-weight:bold; color:#42ff42');

    let project: any;
    if (path) {
      project = await this.get(fileName, { dataPath: path });
    } else {
      project = await this.get(fileName);
    }

    const newProject: Project = this.projectFactory.fromStorageJson(project);

    console.log(newProject);
    return newProject;
  }

  public async delete(fileName: string, path?: string): Promise<void> {
    console.log('%cDelete ' + fileName, 'font-weight:bold; color:#42ff42');
    if (path) {
      return await this.remove(fileName, { dataPath: path });
    }
    return await this.remove(fileName);
  }
}
