import { Action } from '@ngrx/store';
 
export enum LoadActions {
  StartLoad = '[Load] Start',
  StopLoad = '[Load] Stop'
}
 
export class StartLoad implements Action {
  readonly type = LoadActions.StartLoad;
}
 
export class StopLoad implements Action {
  readonly type = LoadActions.StopLoad;
}
