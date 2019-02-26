import { Sequence } from "./sequence";

export class Project {
    name: string;
    sequences: Sequence[];

    constructor(name: string){
        this.sequences = [];
        this.name = name;
    }
}