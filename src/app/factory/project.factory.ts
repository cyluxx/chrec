import { Injectable } from "@angular/core";
import { Project } from "../model/project";
import { SequenceFactory } from "./sequence.factory";

@Injectable()
export class ProjectFactory {

    private sequenceFactory: SequenceFactory;

    constructor(sequenceFactory: SequenceFactory) {
        this.sequenceFactory = sequenceFactory;
    }

    public fromAny(project: any): Project {
        let newProject: Project = new Project(project.name);

        if (project.sequences) {
            for (let sequence of project.sequences) {
                newProject.sequences.push(this.sequenceFactory.fromAny(sequence));
            }
        }

        return newProject;
    }
}