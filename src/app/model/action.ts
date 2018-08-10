export class Action {
    id: number;
    type: Type;
    url: string;
    selector: string;
    value: string;
    keyCode: number;
    filename: string;
}

export enum Type {
    click = 'click',
    type = 'type',
    goto = 'goto',
    refresh = 'refresh',
    forward = 'forward',
    back = 'back',
    screenshot = 'screenshot'
}