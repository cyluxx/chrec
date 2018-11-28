import { Injectable } from "@angular/core";
import { Project } from "../model/project";
import { Name as ActionName, Back, Action, Forward, GoTo, Refresh, Click, Read, Type } from "../model/action";
import * as util from 'util';
import * as storage from 'electron-json-storage';

@Injectable()
export class ProjectDao implements Dao<Project>{

    private set: (fileName: string, object: object, options?: object) => Promise<void>;
    private get: (fileName: string, options?: object) => Promise<Project>;
    private remove: (fileName: string, options?: object) => Promise<void>;
    private keys: (options?: object) => Promise<string[]>;

    constructor() {
        this.set = util.promisify(storage.set);
        this.get = util.promisify(storage.get);
        this.remove = util.promisify(storage.remove);
        this.keys = util.promisify(storage.keys);

        console.log('%c Default Project Storage Data Path: ' + storage.getDefaultDataPath(), 'color: #36f9c2; font-weight: bold');
    }

    public async create(fileName: string, project: Project, path?: string): Promise<void> {
        console.log('%c Create ' + fileName, 'font-weight:bold; color:#42ff42');
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

        let newProject = project as Project;

        for (let i = 0; i < project.sequences.length; i++) {
            for (let j = 0; j < project.sequences[i].actions.length; j++) {
                project.sequences[i].actions[j] = this.buildConcreteActionFromAny(project.sequences[i].actions[j]);
            }
        }

        console.log('%c Read ' + fileName, 'font-weight:bold; color:#42ff42');
        console.log(project);
        return newProject;
    }

    public async update(fileName: string, project: Project, path?: string): Promise<void> {
        console.log('%c Update ' + fileName, 'font-weight:bold; color:#42ff42');
        console.log(project);
        if (path) {
            return await this.set(fileName, project, { dataPath: path });
        }
        return await this.set(fileName, project);
    }

    public async delete(fileName: string, path?: string): Promise<void> {
        console.log('%c Delete ' + fileName, 'font-weight:bold; color:#42ff42');
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

    private buildConcreteActionFromAny(action: any): Action {
        switch (action.name) {
            case ActionName.Back: {
                return new Back(action.image);
            }
            case ActionName.Forward: {
                return new Forward(action.image);
            }
            case ActionName.GoTo: {
                return new GoTo(action.image, action.url);
            }
            case ActionName.Refresh: {
                return new Refresh(action.image);
            }
            case ActionName.Click: {
                return new Click(action.image, action.selectors, action.boundingBox);
            }
            case ActionName.Read: {
                return new Read(action.image, action.selectors, action.boundingBox, action.value);
            }
            case ActionName.Type: {
                return new Type(action.image, action.selectors, action.boundingBox, action.value, action.keyCode);
            }
        }
    }
}