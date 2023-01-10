import { useMemo, useState } from 'react';


function useTags(notes: INote[]): TuseTags {
  const [tags, setTags] = useState(getTags(notes));

  useMemo(() => setTags(getTags(notes)), [notes]);

  return [tags, setTags];
}

function getTags(notes: INote[]): string[] {
  const tagsArr: string[] = [];

  notes?.length && notes.forEach((note) => note.tags.forEach(tag => !tagsArr.includes(tag) && tagsArr.push(tag)));

  return tagsArr;
}

export default useTags;
