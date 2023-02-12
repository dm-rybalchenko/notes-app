import { INoteModel } from "../../interfaces/apiModels.types";


export interface INoteListProps {
  notes: INoteModel[];
  title: string;
  wrapper?: boolean;
  counter?: boolean;
}
