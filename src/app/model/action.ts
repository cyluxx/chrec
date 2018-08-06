export class Action {
    type: Type;
    url: string;
    selector: string;
    value: string;
    keyCode: number;
}

export enum Type {
    click = 'click',
    type = 'type',
    goto = 'goto',
    refresh = 'refresh',
    forward = 'forward',
    back = 'back'
}