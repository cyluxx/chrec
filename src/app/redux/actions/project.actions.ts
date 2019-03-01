import { Action } from '@ngrx/store';

export const CREATE = '[Project] Create';
export const EDIT_NAME = '[Project] Edit Name';

export class Create implements Action {
    readonly type = CREATE;

    constructor(public payload: string) { }
}

export class EditName implements Action {
    readonly type = EDIT_NAME;

    constructor(public payload: string) { }
}

export type All = Create | EditName;
