export interface IFileModel {
  id: string;
  url: string;
  name: string;
}

export interface INoteModel {
  id?: string;
  title: string;
  body: string;
  tags: string[];
  date: string;
  file?: IFileModel;
  pinned?: boolean;
  favorite?: boolean;
}

export interface IUserModel {
  id: string;
  email: string;
  isActivated: boolean;
}

export interface IAuthModel {
  accessToken: string;
  refreshToken: string;
  user: IUserModel;
}
