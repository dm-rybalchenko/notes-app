type TNoteFunc = (id: string) => void;
type TTagFunc = (tag: string) => void;
type TuseTags = [string[], React.Dispatch<React.SetStateAction<string[]>>];

interface INote {
  id: string;
  title: string;
  body: string;
  tags: string[];
  date: Dayjs | string;
}

interface IFilter {
  tags: string[];
  query: string;
  sort: string;
}

interface IEditNoteProps {
  current: INote;
  close: React.Dispatch<React.SetStateAction<INote | null>>;
  add: (id: string, note: INote) => void;
}

interface IShowNoteProps {
  note: INote;
  close: React.Dispatch<React.SetStateAction<INote | null>>;
}

interface IHeaderProps {
  newNote: React.Dispatch<React.SetStateAction<INote | null>>;
  notes: INote[];
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
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
  remove: TNoteFunc;
  edit: TNoteFunc;
}

interface IButtonProps {
  children: string;
  modClass: string;
  onClick: (e: MouseEventHandler<HTMLButtonElement>) => void;
}

interface ISelectProps {
  value: string;
  onChange: (value: string) => void;
  defaultValue: string;
  options: {
    value: string;
    name: string;
  }[];
}

interface ITagFormProps {
  add: (tag: string) => void;
  show: (value: React.SetStateAction<boolean>) => void;
}
