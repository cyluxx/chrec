import { Action } from '@ngrx/store';
import { Action as ChrecAction } from 'chrec-core/lib/model/action/action';

export enum ActionTypes {
  AddAction = '[BrowserWindowComponent] AddAction'
}

export class AddAction implements Action {
  readonly type = ActionTypes.AddAction;

  constructor(public payload: { action: ChrecAction }) { }
}
