export class AlexExport {
    version: string = '1.6.1';
    type: string = 'symbolGroups';
    symbolGroups: SymbolGroup[] = [];

    constructor(symbolGroup: SymbolGroup) {
        this.symbolGroups.push(symbolGroup);
    }
}

export class SymbolGroup {
    name: string = 'Default group';
    parent = null;
    symbols: Symbol[] = [];
    groups = [];

    constructor(symbols: Symbol[]) {
        this.symbols = symbols;
    }
}

export class Symbol {
    name: string;
    description: string = '';
    expectedResult: string = '';
    successOutput = null;
    inputs = [];
    outputs = [];
    steps: Step[] = [];

    constructor(name: string, steps: Step[]) {
        this.name = name;
        this.steps = steps;
    }
}

export class Step {
    type: string = 'action';
    disabled: boolean = false;
    ignoreFailure: boolean = false;
    negated: boolean = false;
    errorOutput = null;
    action: Action;
    position: number;

    constructor(action: Action, position: number) {
        this.action = action;
        this.position = position;
    }
}

export class Action {
    type: ActionType;
    value: string;
    node: Node;
    regexp: boolean = false;
    doubleClick: boolean;
    url: string;
    credentials;
    action: string;

    constructor(type: ActionType, node: Node, value: string, url: string) {
        this.type = type;
        switch (type) {
            case ActionType.web_fill:
                this.value = value;
                this.node = node;
                break;
            case ActionType.web_checkForText:
                this.value = value;
                this.node = node;
                break;
            case ActionType.web_click:
                this.doubleClick = false;
                this.node = node;
                break;
            case ActionType.web_goto:
                this.url = url;
                this.credentials = { name: '', password: '' };
                break;
            case ActionType.web_browser:
                this.action = 'REFRESH';
                break;
        }
    }
}

export class Node {
    selector: string;
    type: NodeType;

    constructor(selector: string, type: NodeType) {
        this.selector = selector;
        this.type = type;
    }
}

export enum ActionType {
    web_fill,
    web_checkForText,
    web_click,
    web_goto,
    web_browser
}

export enum NodeType {
    CSS,
    XPATH
}