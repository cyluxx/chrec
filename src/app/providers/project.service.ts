import { Injectable } from "@angular/core";
import { Project } from "../model/project";
import { ProjectDao } from "../dao/project.dao";

const DEFAULT_PROJECT = 'default project';

@Injectable()
export class ProjectService {

    private projectDao: ProjectDao;

    constructor(projectDao: ProjectDao) {
        this.projectDao = projectDao;
    }

    public async getDefaultProject(): Promise<Project> {
        let project: Project = await this.projectDao.read(DEFAULT_PROJECT);
        if(project.name){
            return project;
        }
        project = new Project();
        project.name = DEFAULT_PROJECT;
        return project;
    }

    public setDefaultProject(project: Project): void {
        this.projectDao.create(DEFAULT_PROJECT, project);
    }

    public removeDefaultProject(): void {
        this.projectDao.delete(DEFAULT_PROJECT);
    }
}