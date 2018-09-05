export class Action{
    id: string;
    type: Type;
    url: string;
    selector: string;
    value: string;
    keyCode: number;
    filename: string;

    constructor(){
        this.id = Math.random().toString(36).substr(2, 9);
    }
}

export enum Type{
    click = 'click',
    type = 'type',
    goto = 'goto',
    refresh = 'refresh',
    forward = 'forward',
    back = 'back',
    screenshot = 'screenshot'
}