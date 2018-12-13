import { Injectable } from "@angular/core";
import { Selector } from "../model/selector";

@Injectable()
export class SelectorFactory {

    public fromAny(selector: any): Selector {
        let newSelector: Selector = new Selector(selector.method, selector.value);
        newSelector.executable = selector.executable;
        return newSelector;
    }
}