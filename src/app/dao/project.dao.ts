import { Injectable } from "@angular/core";
import { Project } from "../model/project";
import { Name as ActionName, Back, Action, Forward, GoTo, Refresh, Click, Read, Type } from "../model/action";
import * as util from 'util';
import * as storage from 'electron-json-storage';
import { Sequence } from "../model/sequence";

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

        console.log('%c Default Storage Data Path: ' + storage.getDefaultDataPath(), 'color: #36f9c2; font-weight: bold');
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
                switch (project.sequences[i].actions[j].name) {
                    case ActionName.Back: {
                        newProject.sequences[i].actions[j] = new Back(project.sequences[i].actions[j].image);
                        break;
                    }
                    case ActionName.Forward: {
                        newProject.sequences[i].actions[j] = new Forward(project.sequences[i].actions[j].image);
                        break;
                    }
                    case ActionName.GoTo: {
                        newProject.sequences[i].actions[j] = new GoTo(project.sequences[i].actions[j].image, project.sequences[i].actions[j].url);
                        break;
                    }
                    case ActionName.Refresh: {
                        newProject.sequences[i].actions[j] = new Refresh(project.sequences[i].actions[j].image);
                        break;
                    }
                    case ActionName.Click: {
                        newProject.sequences[i].actions[j] = new Click(project.sequences[i].actions[j].image, project.sequences[i].actions[j].selectors, project.sequences[i].actions[j].boundingBox);
                        break;
                    }
                    case ActionName.Read: {
                        newProject.sequences[i].actions[j] = new Read(project.sequences[i].actions[j].image, project.sequences[i].actions[j].selectors, project.sequences[i].actions[j].boundingBox, project.sequences[i].actions[j].value);
                        break;
                    }
                    case ActionName.Type: {
                        newProject.sequences[i].actions[j] = new Type(project.sequences[i].actions[j].image, project.sequences[i].actions[j].selectors, project.sequences[i].actions[j].boundingBox, project.sequences[i].actions[j].value, project.sequences[i].actions[j].keyCode);
                        break;
                    }
                }
            }
        }



        // let newProject = new Project();
        // newProject.name = project.name;

        // let newSequences: Sequence[] = [];
        // for(let sequence of project.sequences){
        //     let newSequence: Sequence;
        //     newSequence.name = sequence.name;
        //     newSequence.executable = sequence.executable;
        //     newSequence.tested = sequence.tested;

        //     let newActions: Action[] = [];
        //     for(let action of sequence.actions){
        //         switch(action.name){
        //             case ActionName.Back: {
        //                 action = action as Back;
        //                 break;
        //             }
        //             case ActionName.Forward: {
        //                 action = action as Forward;
        //                 break;
        //             }
        //             case ActionName.GoTo: {
        //                 action = action as GoTo;
        //                 break;
        //             }
        //             case ActionName.Refresh: {
        //                 action = action as Refresh;
        //                 break;
        //             }
        //             case ActionName.Click: {
        //                 action = action as Click;
        //                 break;
        //             }
        //             case ActionName.Read: {
        //                 action = action as Read;
        //                 break;
        //             }
        //             case ActionName.Type: {
        //                 action = action as Type;
        //                 break;
        //             }
        //         }
        //     }
        //     newSequence.actions = newActions;
        //     newSequences.push(newSequence);
        // }
        // newProject.sequences = newSequences;

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
}