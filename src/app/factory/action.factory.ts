import { Locator } from 'chrec-core/lib/model/locator/locator';
import { Click } from 'chrec-core/lib/model/action/html-element-action/click';
import { Injectable } from '@angular/core';
import { LocatorFactory } from './locator.factory';
import { HtmlElementAction } from 'chrec-core/lib/model/action/html-element-action/html-element-action';
import { BoundingBoxFactory } from './bounding-box.factory';
import { Action } from 'chrec-core/lib/model/action/action';
import { ModelFactory } from 'chrec-core/lib/factory/model.factory';

@Injectable()
export class ActionFactory {

    private modelFactory: ModelFactory = new ModelFactory();

    constructor(private locatorFactory: LocatorFactory, private boundingBoxFactory: BoundingBoxFactory) { }

    public fromChannelContent(channelContent: any, image: string): HtmlElementAction {
        const locators: Locator[] = [];

        if (channelContent.locators) {
            for (const locator of channelContent.locators) {
                locators.push(this.locatorFactory.fromChannelContent(locator));
            }
        }

        switch (channelContent.className) {
            case 'Click': {
                return new Click(image, locators, this.boundingBoxFactory.fromChannelContent(channelContent.boundingBox));
            }
            default: {
                throw new Error('Action Factory Error (fromChannelContent): Could not instaciate ' + channelContent.action);
            }
        }
    }

    public fromStorageJson(parsedJson: any): Action {
        return this.modelFactory.actionFromChrecJson(parsedJson);
    }
}
