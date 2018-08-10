import { Injectable } from "@angular/core";
import { Project } from "../model/project";
import { Sequence } from "../model/sequence";
import { Action } from "../model/action";
const storage = require('electron-json-storage');

@Injectable()
export class DatabaseService {

    public setProject(project: Project): void {
        storage.set(project.name, project, function (error) {
            if (error) throw error;
        });
    }

    public getProject(projectName: string): Project {
        let project = new Project();
        storage.get(projectName, function (error, data) {
            if (error) throw error;
            //TODO implement deserialisation
        });
        return project as Project;
    }

    public clearProjects(): void {
        storage.clear(function(error) {
            if (error) throw error;
          });
    }
}