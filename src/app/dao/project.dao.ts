import { Injectable } from "@angular/core";
import { Project } from "../model/project";
import { Sequence } from "../model/sequence";
import { Name as ActionName, Back, Action, Forward, GoTo, Refresh, Click, Read, Type, HtmlElementAction } from "../model/action";
import * as util from 'util';
import * as storage from 'electron-json-storage';
import { Browser } from "../model/browser";
import { Selector } from "../model/selector";
import { ProjectFactory } from "../factory/project.factory";

@Injectable()
export class ProjectDao implements Dao<Project>{

    private projectFactory: ProjectFactory;

    private set: (fileName: string, object: object, options?: object) => Promise<void>;
    private get: (fileName: string, options?: object) => Promise<Project>;
    private remove: (fileName: string, options?: object) => Promise<void>;
    private keys: (options?: object) => Promise<string[]>;

    constructor(projectFactory: ProjectFactory) {
        this.projectFactory = projectFactory;

        this.set = util.promisify(storage.set);
        this.get = util.promisify(storage.get);
        this.remove = util.promisify(storage.remove);
        this.keys = util.promisify(storage.keys);

        console.log('%cDefault Project Storage Data Path: ' + storage.getDefaultDataPath(), 'color: #36f9c2; font-weight: bold');
    }

    public async create(fileName: string, project: Project, path?: string): Promise<void> {
        console.log('%cCreate ' + fileName, 'font-weight:bold; color:#42ff42');
        console.log(project);
        return await this.update(fileName, project, path);
    }

    public async read(fileName: string, path?: string): Promise<Project> {
        let project: any;
        if (path) {
            project = await this.get(fileName, { dataPath: path });
        }
        else {
            project = await this.get(fileName);
        }

        let newProject: Project = this.projectFactory.fromAny(project);

        console.log('%cRead ' + fileName, 'font-weight:bold; color:#42ff42');
        console.log(newProject);
        return newProject;
    }

    public async update(fileName: string, project: Project, path?: string): Promise<void> {
        console.log('%cUpdate ' + fileName, 'font-weight:bold; color:#42ff42');
        console.log(project);
        if (path) {
            return await this.set(fileName, project, { dataPath: path });
        }
        return await this.set(fileName, project);
    }

    public async delete(fileName: string, path?: string): Promise<void> {
        console.log('%cDelete ' + fileName, 'font-weight:bold; color:#42ff42');
        if (path) {
            return await this.remove(fileName, { dataPath: path });
        }
        return await this.remove(fileName);
    }

    public async list(path?: string): Promise<string[]> {
        if (path) {
            return await this.keys({ dataPath: path });
        }
        return await this.keys();
    }
}