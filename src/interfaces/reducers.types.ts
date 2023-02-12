import { IFileModel, INoteModel, IUserModel } from './apiModels.types';

export interface IAuth {
  user: IUserModel;
  isAuth: boolean;
}

export interface IEditNote {
  note: INoteModel;
  html: string;
  currentTags: string[];
}

export interface IFilter {
  tags: string[];
  query: string;
  sort: string;
}

export interface INotes {
  notes: INoteModel[];
}

export interface INotification {
  error: null | string;
  warning: null | string;
}

export interface IPagination {
  page: number;
  limit: number;
}

export interface IPopup {
  popup: null | IFileModel;
}




