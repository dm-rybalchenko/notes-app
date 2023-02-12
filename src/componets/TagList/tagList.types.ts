export interface ITagListProps {
  modClass?: string;
  tags: string[];
  icon?: boolean;
  current?: string[];
  choose: (tag: string) => void;
  remove: (tag: string) => void;
}
