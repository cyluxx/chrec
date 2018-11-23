import { NativeImage } from "electron";

export class Action {
    id: string;
    type: Type;
    url: string;
    selectors: string[];
    value: string;
    keyCode: number;
    boundingBox: DOMRect;
    image: string;

    constructor() {
        this.id = Math.random().toString(36).substr(2, 9);
    }
}

export enum Type {
    click = 'click',
    type = 'type',
    goto = 'goto',
    refresh = 'refresh',
    forward = 'forward',
    back = 'back',
    read = 'read'
}