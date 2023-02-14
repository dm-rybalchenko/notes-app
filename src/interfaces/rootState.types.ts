import {
  IAuth,
  IEditNote,
  IFilter,
  INotes,
  INotification,
  IPagination,
  IPopup,
} from './reducers.types';


export interface IRootState {
  notes: INotes;
  filter: IFilter;
  pagination: IPagination;
  auth: IAuth;
  editNote: IEditNote;
  notification: INotification;
  popup: IPopup;
}
