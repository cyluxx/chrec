import { Action } from "./action";

export class Sequence{
    name: string;
    actions: Action[];

    constructor(){
        this.actions = [];
    }
}