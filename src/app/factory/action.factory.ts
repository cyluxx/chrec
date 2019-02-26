import { Injectable } from "@angular/core";
import { Selector } from "../model/selector";
import { Back, Forward, GoTo, Refresh, Click, Read, Type, Name as ActionName, Action, HtmlElementAction } from "../model/action";
import { SelectorFactory } from "./selector.factory";

@Injectable()
export class ActionFactory {

    private selectorFactory: SelectorFactory;

    constructor(selectorFactory: SelectorFactory) {
        this.selectorFactory = selectorFactory;
    }

    public fromAny(action: any): Action {
        let selectors: Selector[] = [];
        if (action.selectors) {
            for (let selector of action.selectors) {
                selectors.push(this.selectorFactory.fromAny(selector));
            }
        }

        switch (action.name) {
            case ActionName.Back: {
                return new Back(action.image);
            }
            case ActionName.Forward: {
                return new Forward(action.image);
            }
            case ActionName.GoTo: {
                return new GoTo(action.image, action.url);
            }
            case ActionName.Refresh: {
                return new Refresh(action.image);
            }
            case ActionName.Click: {
                return new Click(action.image, selectors, action.boundingBox);
            }
            case ActionName.Read: {
                return new Read(action.image, selectors, action.boundingBox, action.value);
            }
            case ActionName.Type: {
                return new Type(action.image, selectors, action.boundingBox, action.value, action.keyCode);
            }
            default: {
                throw new Error('Action Factory Error (fromAny): Could not instaciate ' + action.name);
            }
        }
    }

    public fromChannelContent(channelContent: any, image: string): HtmlElementAction {
        let selectors: Selector[] = [];

        if (channelContent.selectors) {
            for (let selector of channelContent.selectors) {
                selectors.push(this.selectorFactory.fromChannelContent(selector));
            }
        }

        switch (channelContent.action) {
            case 'click': {
                return new Click(image, selectors, channelContent.boundingBox);
            }
            case 'read': {
                return new Read(image, selectors, channelContent.boundingBox, channelContent.value);
            }
            case 'type': {
                return new Type(image, selectors, channelContent.boundingBox, channelContent.value, channelContent.key);
            }
            default: {
                throw new Error('Action Factory Error (fromChannelContent): Could not instaciate ' + channelContent.action);
            }
        }
    }

    public fromAction(action: Action): Action {
        return this.fromAny(action);
    }
}