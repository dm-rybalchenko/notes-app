import { useMemo } from 'react';
import dayjs from 'dayjs';

function useFilterNotes(notes: INote[], filter: IFilter): INote[] {
  let filteredNotes = useSortNotes(notes, filter.sort);

  filteredNotes = useFilterNotesByTags(filteredNotes, filter.tags);

  filteredNotes = useFilterNotesBySearch(filteredNotes, filter.query);

  return filteredNotes;
}

function useSortNotes(notes: INote[], param: string): INote[] {
  return useMemo(() => {
    if (param === 'title') {
      return [...notes].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (param === 'old') {
      return [...notes].sort((a, b) =>
        dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1
      );
    }

    if (param === 'new') {
      return [...notes].sort((a, b) =>
        dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1
      );
    } else {
      return notes;
    }
  }, [param, notes]);
}

function useFilterNotesByTags(notes: INote[], filterTags: string[]): INote[] {
  return useMemo(() => {
    if (!filterTags.length) {
      return notes;
    }

    return [
      ...notes.filter((item) => {
        let res = false;

        item.tags.forEach((tag) => {
          if (filterTags.includes(tag)) {
            res = true;
          }
        });

        return res;
      }),
    ];
  }, [filterTags, notes]);
}

function useFilterNotesBySearch(notes: INote[], searchString: string): INote[] {
  return useMemo(() => {
    if (!searchString) {
      return notes;
    }

    return notes.filter((note) =>
      `${note.title} ${note.body}`.toLowerCase().includes(searchString.toLowerCase())
    );
  }, [searchString, notes]);
}

export default useFilterNotes;
