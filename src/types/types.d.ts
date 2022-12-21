type TNoteFunc = (id: string) => void;
type TTagFunc = (tag: string) => void;

interface INote {
  id: string;
  title: string;
  body: string;
  tags: string[];
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
  newNote: React.Dispatch<React.SetStateAction<INote | null>>
  tags: string[];
  add: TTagFunc;
  current: string[];
  choose: TTagFunc;
  remove: TTagFunc;
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

interface ITagFormProps {
  add: (tag: string) => void;
  show: (value: React.SetStateAction<boolean>) => void;
}
