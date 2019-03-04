import { Action } from '@ngrx/store';
import { Sequence } from 'chrec-core/lib/model/sequence';
import { ProjectTestResult } from 'chrec-core/lib/model/test-result/project-test-result';

export const CREATE = '[Project] Create';
export const EDIT_NAME = '[Project] Edit Name';
export const ADD_SEQUENCE = '[Project] Add Sequence';
export const ADD_TEST_RESULT = '[Project] Add Project Test Result';

export class Create implements Action {
    readonly type = CREATE;

    constructor(public payload: string) { }
}

export class EditName implements Action {
    readonly type = EDIT_NAME;

    constructor(public payload: string) { }
}

export class AddSequence implements Action {
    readonly type = ADD_SEQUENCE;

    constructor(public payload: Sequence) { }
}

export class AddTestResult implements Action {
    readonly type = ADD_TEST_RESULT;

    constructor(public payload: ProjectTestResult) { }
}

export type All = Create | EditName | AddSequence | AddTestResult;
