import { Action } from "./action";

export class Sequence{
    name: string;
    executable: boolean;
    actions: Action[];

    constructor(){
        this.actions = [];
        this.executable = false;
    }
}