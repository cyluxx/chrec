import { Action } from "./action";

export class Sequence {
    name: string;
    tested: boolean;
    executable: boolean;
    actions: Action[];

    constructor() {
        this.actions = [];
        this.executable = false;
    }
}