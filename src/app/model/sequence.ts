import { Browser } from "./browser";
import { Action } from "./action";

export class Sequence {
    name: string;
    tested: boolean;
    executable: boolean;
    browsers: Browser[];
    actions: Action[];

    constructor(name: string) {
        this.browsers = [];
        this.actions = [];
        this.name = name;
    }
}