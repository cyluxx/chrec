import { Injectable } from "@angular/core";
import { Project } from "../model/project";
import * as util from 'util';
const storage = require('electron-json-storage');

@Injectable()
export class DatabaseService {

    private get: (projectName: String) => Promise<Project>;

    constructor(){
        this.get = util.promisify(storage.get);
    }

    public setProject(project: Project): void {
        storage.set(project.name, project, (error) => {
            if (error) throw error;
        });
    }

    public async getProject(projectName: string): Promise<Project> {
        return await this.get(projectName);
    }

    public clearProjects(): void {
        storage.clear((error) => {
            if (error) throw error;
        });
    }
}