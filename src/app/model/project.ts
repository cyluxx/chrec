import { Sequence } from "./sequence";

export class Project {
    name: string;
    sequences: Sequence[];

    constructor(){
        this.sequences = [];
    }
}