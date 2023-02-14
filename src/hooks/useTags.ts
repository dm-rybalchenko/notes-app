import { useMemo } from 'react';

import { INoteModel } from '../interfaces/apiModels.types';


function useTags(notes: INoteModel[]): string[] {
  return useMemo(() => {
    const tagsArr: string[] = [];

    notes?.length
      && notes.forEach((note) => note.tags.forEach((tag) => !tagsArr.includes(tag) && tagsArr.push(tag)));

    return tagsArr;
  }, [notes]);
}

export default useTags;
