import { Core } from 'chrec-core';
import { Injectable } from '@angular/core';
import { ProjectDao } from '../dao/project.dao';
import { Project } from 'chrec-core/lib/model/project';

const DEFAULT_PROJECT = 'default project';

@Injectable()
export class ProjectService {

    private projectDao: ProjectDao;
    private core: Core = new Core();

    constructor(projectDao: ProjectDao) {
        this.projectDao = projectDao;
    }

    public newDefaultProject(): Project {
        return new Project(DEFAULT_PROJECT, [], []);
    }

    public async getDefaultProject(): Promise<Project> {
        let project: Project = await this.projectDao.read(DEFAULT_PROJECT);
        if (project.name) {
            return project;
        }
        project = new Project(DEFAULT_PROJECT);
        return project;
    }

    public setDefaultProject(project: Project): void {
        this.projectDao.create(DEFAULT_PROJECT, project);
    }

    public removeDefaultProject(): void {
        this.projectDao.delete(DEFAULT_PROJECT);
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