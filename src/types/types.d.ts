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
	tags: string[];
	addNote: () => void;
	add: TTagFunc;
	current: string[];
	choose: TTagFunc;
	remove: TTagFunc;
}

interface INoteListProps {
	notes: INotes[];
	remove: TNoteFunc;
	edit: TNoteFunc;
	show: TNoteFunc;
}

interface ITagListProps {
	head: boolean;
	tags: string[];
	icon?: boolean;
	current?: string[];
	choose: TTagFunc;
	remove?: TTagFunc;
}

interface INotePorps {
	id: string;
	title: string;
	remove: TNoteFunc;
	show: TNoteFunc;
	edit: TNoteFunc;
}

interface IButtonProps {
  head: boolean;
  children: string;
  onClick: (e: MouseEventHandler<HTMLButtonElement>) => void;
}