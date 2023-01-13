type TNoteFunc = (id: string) => void;
type TTagFunc = (tag: string) => void;
type TPageFunc = (page: number) => void;
type TuseTags = [string[], React.Dispatch<React.SetStateAction<string[]>>];
type TFetchAllNotes = () => Promise<void>;
type TFetchOneNote = (arg: INote) => Promise<void>;
type TFetchCallback = TFetchOneNote | TTFetchAllNotes;
type TRefDiv = React.MutableRefObject<HTMLDivElement | null>;

// TODO везде переписать id на _id
interface INote {
  _id?: string;
  title: string;
  body: string;
  tags: string[];
  date: Dayjs | string;
  file?: IFile;
}

interface IFile {
	id: string,
	url: string,
	name: string,
}

interface IFilter {
  tags: string[];
  query: string;
  sort: string;
}

interface IMainState {
  notes: {
    notes: INote[];
  };
  filter: IFilter;
  pagination: {
    page: number;
    limit: number;
  };
}

interface ILoadingType {
  lazyLoading: boolean;
  setLazyLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IisAuth {
  isAuth: boolean;
  isLoading: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
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
  modClass: string;
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
  children: string;
  modClass: string;
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

interface IPaginationProps {
  current: number;
  totalPages: number[];
  changePage: TPageFunc;
}

// TODO интерфейс для ненужной компоненты, удалить в следующей версии
interface ITagFormProps {
  add: (tag: string) => void;
  show: (value: React.SetStateAction<boolean>) => void;
}
