type TNoteFunc = (id: string) => void;
type TTagFunc = (tag: string) => void;
type TPageFunc = (page: number) => void;
type TuseTags = [string[], React.Dispatch<React.SetStateAction<string[]>>];
type TRefDiv = React.MutableRefObject<HTMLDivElement | null>;

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
}

declare module '*.scss';

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

interface ILoginForm {
  email: string;
  password: string;
}

interface IFileForm {
  file: FileList;
}

interface ILoadingType {
  lazyLoading: boolean;
  setLazyLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFileFormProps {
  note: INote;
  setNote: React.Dispatch<React.SetStateAction<INote>>;
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
  notes: INotes[];
  remove: TNoteFunc;
  edit: TNoteFunc;
}

interface ITagListProps {
  modClass?: string;
  tags: string[];
  icon?: boolean;
  current?: string[];
  choose: TTagFunc;
  remove?: TTagFunc;
}

interface INotePorps {
  note: INote;
}

interface IButtonProps {
  children: string | React.ReactNode;
  modClass?: string;
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
  value?: string;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IPaginationProps {
  current: number;
  totalPages: number[];
  changePage: TPageFunc;
}
