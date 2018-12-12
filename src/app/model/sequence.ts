import { Browser } from "./browser";
import { Action } from "./action";

export class Sequence {
    name: string;
    tested: boolean;
    executable: boolean;
    browsers: Browser[];
    recordedActions: Action[];

    constructor(name: string) {
        this.browsers = [];
        this.recordedActions = [];
        this.name = name;
    }
}