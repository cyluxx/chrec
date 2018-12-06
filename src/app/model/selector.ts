export class Selector {
    type: Type;
    method: Method;
    value: string;
    executable: boolean;

    constructor(method: Method, value: string) {
        this.method = method;
        this.value = value;

        if (
            this.method === Method.CssSelectorGenerator
            || this.method === Method.Finder
            || this.method === Method.GetQuerySelector
            || this.method === Method.OptimalSelect
            || this.method === Method.SelectorQuery
        ) {

            this.type = Type.Css;
        }
        else {
            this.type = Type.XPath;
        }
    }
}

export enum Type {
    XPath = 'XPath',
    Css = 'CSS'
}

export enum Method {
    CssSelectorGenerator = 'CssSelectorGenerator',
    Finder = 'Finder',
    GetQuerySelector = 'GetQuerySelector',
    OptimalSelect = 'OptimalSelect',
    SelectorQuery = 'SelectorQuery'
}