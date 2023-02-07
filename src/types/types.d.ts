declare module '*.module.css';
declare module '*.module.scss';

interface IMainState {
  auth: IAuth;
  notes: {
    notes: INote[];
  };
  filter: IFilter;
  pagination: {
    page: number;
    limit: number;
  };
  editNote: IEditNote;
  modal: IModal;
  notification: INotification;
}

interface IEditNote {
  note: INote;
  html: string;
  currentTags: string[];
}
interface IUser {
  id: string;
  email: string;
  isActivated: boolean;
}

interface AuthResponce {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
interface IAuth {
  user: IUser;
  isAuth: boolean;
}

interface INote {
  id?: string;
  title: string;
  body: string;
  tags: string[];
  date: Dayjs | string;
  file?: IFile;
  pinned?: boolean;
  favorite?: boolean;
}

interface IFile {
  id: string;
  url: string;
  name: string;
}

interface IFilter {
  tags: string[];
  query: string;
  sort: string;
}

interface IModal {
  coords: {
    x: number;
    y: number;
  };
  title: string;
  body: string;
  callback: any;
}

interface INotification {
  error: null | string;
  warning: null | string;
}

interface ILoginForm {
  email: string;
  password: string;
}
interface IRegForm {
  email: string;
  password: string;
  confirmPassword: string;
}

interface IFileForm {
  file: FileList;
}

interface ILoadingContext {
  lazyLoading: boolean;
  setLazyLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IModalContext {
  modal: null | IModal;
  setModal: React.Dispatch<React.SetStateAction<null | IModal>>;
}
interface IFiltersProps {
  favorites: boolean;
  setFavorites: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IShowNoteProps {
  note: INote;
  close: React.Dispatch<React.SetStateAction<INote | null>>;
}

interface ISearchFormProps {
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
}

interface INoteListProps {
  notes: INote[];
  title: string;
  wrap?: boolean;
}

interface ITagListProps {
  modClass?: string;
  tags: string[];
  icon?: boolean;
  current?: string[];
  choose: (tag: string) => void;
  remove: (tag: string) => void;
}

interface INotePorps {
  note: INote;
}

interface IHeaderPorps {
  children?: React.ReactNode;
  main?: boolean;
}

interface IRegFormPorps {
  setLoginPage: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IButtonProps {
  children: string | React.ReactNode;
  modClass?: string;
  type?: 'submit';
  onClick?: (e: MouseEventHandler<HTMLButtonElement>) => void;
}

interface ISelectProps {
  value: string | number;
  onChange: (value: string | string) => void;
  defaultValue: string;
  options: {
    value: string | number;
    name: string;
  }[];
}

interface IInputProps {
  type: string;
  placeholder: string;
  modClass?: string;
  value?: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegister<TFieldValues>;
}

interface IPaginationProps {
  current: number;
  totalPages: number[];
  changePage: (page: number) => void;
}
