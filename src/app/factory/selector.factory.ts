import { Injectable } from "@angular/core";
import { Selector } from "../model/selector";

@Injectable()
export class SelectorFactory {

    public fromAny(selector: any): Selector {
        return new Selector(selector.method, selector.value, selector.executableIterations);
    }

    public fromChannelContent(channelContentSelector: any): Selector {
        return new Selector(channelContentSelector.method, channelContentSelector.value, 0);
    }
}