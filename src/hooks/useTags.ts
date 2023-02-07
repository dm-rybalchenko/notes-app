import { useMemo } from 'react';

function useTags(notes: INote[]): string[] {
  return useMemo(() => {
    const tagsArr: string[] = [];

    notes?.length &&
      notes.forEach((note) =>
        note.tags.forEach((tag) => !tagsArr.includes(tag) && tagsArr.push(tag))
      );

    return tagsArr;
  }, [notes]);
}


export default useTags;
