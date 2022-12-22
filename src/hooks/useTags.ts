import { useMemo, useState } from 'react';


function useTags(notes: INote[]): TuseTags {
  const [tags, setTags] = useState(getTags(notes));

  useMemo(() => setTags(getTags(notes)), [notes]);

  return [tags, setTags];
}

function getTags(notes: INote[]) {
  const tagsArr: string[] = [];

  notes?.length && notes.forEach((note) => tagsArr.push(...note.tags));

  return tagsArr;
}

export default useTags;
