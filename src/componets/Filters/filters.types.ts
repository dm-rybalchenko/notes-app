import { INoteModel } from '../../interfaces/apiModels.types';


export interface IFiltersProps {
  favorites: boolean;
  setFavorites: React.Dispatch<React.SetStateAction<boolean>>;
}

export type INote = INoteModel;
