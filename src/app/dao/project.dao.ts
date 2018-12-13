import { Injectable } from "@angular/core";
import { Project } from "../model/project";
import { Sequence } from "../model/sequence";
import { Name as ActionName, Back, Action, Forward, GoTo, Refresh, Click, Read, Type, HtmlElementAction } from "../model/action";
import * as util from 'util';
import * as storage from 'electron-json-storage';
import { Browser } from "../model/browser";
import { Selector } from "../model/selector";

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

        console.log('%cDefault Project Storage Data Path: ' + storage.getDefaultDataPath(), 'color: #36f9c2; font-weight: bold');
    }

    public async create(fileName: string, project: Project, path?: string): Promise<void> {
        console.log('%cCreate ' + fileName, 'font-weight:bold; color:#42ff42');
        console.log(project);
        return await this.update(fileName, project, path);
    }

    //TODO refactor this hell
    public async read(fileName: string, path?: string): Promise<Project> {
        let project: any;
        if (path) {
            project = await this.get(fileName, { dataPath: path });
        }
        else {
            project = await this.get(fileName);
        }

        let newProject: Project = this.buildConcreteProjectFromAny(project);

        if (project.sequences) {
            for (let sequence of project.sequences) {
                let newSequence: Sequence = this.buildConcreteSequenceFromAny(sequence);
                if (sequence.recordedActions) {
                    for (let action of sequence.recordedActions) {
                        let newAction: Action = this.buildConcreteActionFromAny(action);
                        newSequence.recordedActions.push(newAction);
                    }
                }

                if (sequence.browsers) {
                    for (let browser of sequence.browsers) {
                        let newBrowser: Browser = this.buildConcreteBrowserFromAny(browser);
                        if (browser.actions) {
                            for (let action of browser.actions) {
                                let newAction: Action = this.buildConcreteActionFromAny(action);
                                newBrowser.actions.push(newAction);
                            }
                        }
                        newSequence.browsers.push(newBrowser);
                    }
                }

                newProject.sequences.push(newSequence);
            }
        }

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

    private buildConcreteProjectFromAny(project: any): Project {
        let newProject: Project = new Project(project.name);
        return newProject;
    }

    private buildConcreteSequenceFromAny(sequence: any): Sequence {
        let newSequence: Sequence = new Sequence(sequence.name);
        newSequence.executable = sequence.executable;
        newSequence.tested = sequence.tested;
        return newSequence;
    }

    private buildConcreteActionFromAny(action: any): Action {
        let selectors: Selector[] = [];

        if (action.selectors) {
            for (let selector of action.selectors) {
                let newSelector: Selector = this.buildConcreteSelectorFromAny(selector);
                selectors.push(newSelector);
            }
        }

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
                return new Click(action.image, selectors, action.boundingBox);
            }
            case ActionName.Read: {
                return new Read(action.image, selectors, action.boundingBox, action.value);
            }
            case ActionName.Type: {
                return new Type(action.image, selectors, action.boundingBox, action.value, action.keyCode);
            }
            default: {
                throw new Error('DB Read Error: Could not instantiate ' + action.name);
            }
        }
    }

    private buildConcreteBrowserFromAny(browser: any): Browser {
        let newBrowser: Browser = new Browser();
        newBrowser.name = browser.name;
        newBrowser.type = browser.type;
        newBrowser.width = browser.width;
        newBrowser.height = browser.height;
        newBrowser.headless = browser.headless;
        newBrowser.numberIterations = browser.numberIterations;
        newBrowser.successfulIterations = browser.successfulIterations;
        newBrowser.sleepTimeBetweenActions = browser.sleepTimeBetweenActions;
        return newBrowser;
    }

    private buildConcreteSelectorFromAny(selector: any): Selector {
        let newSelector: Selector = new Selector(selector.method, selector.value);
        newSelector.executable = selector.executable;
        return newSelector;
    }
}