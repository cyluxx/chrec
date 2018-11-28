import { Action } from "./action";

export class Sequence {
    name: string;
    tested: boolean;
    executable: boolean;
    actions: Action[];

    constructor(name: string) {
        this.actions = [];
        this.name = name;
    }
}