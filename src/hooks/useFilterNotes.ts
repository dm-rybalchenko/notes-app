import { useMemo } from 'react';
import dayjs from 'dayjs';
import { INoteModel } from '../interfaces/apiModels.types';
import { IFilter } from '../interfaces/reducers.types';


function useFilterNotes(notes: INoteModel[], filter: IFilter): INoteModel[][] {
  let filteredNotes = useSortNotes(notes, filter.sort);

  filteredNotes = useFilterNotesByTags(filteredNotes, filter.tags);

  filteredNotes = useFilterNotesBySearch(filteredNotes, filter.query);

  return useSplitNotes(filteredNotes);
}

function useSplitNotes(notes: INoteModel[]) {
  return useMemo(() => {
    return [
      notes.filter((note) => !note.pinned),
      notes.filter((note) => note.pinned),
      notes.filter((note) => note.favorite),
    ];
  }, [notes]);
}

function useSortNotes(notes: INoteModel[], param: string): INoteModel[] {
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

function useFilterNotesByTags(
  notes: INoteModel[],
  filterTags: string[]
): INoteModel[] {
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

function useFilterNotesBySearch(
  notes: INoteModel[],
  searchString: string
): INoteModel[] {
  return useMemo(() => {
    if (!searchString) {
      return notes;
    }

    return notes.filter((note) =>
      `${note.title} ${note.body}`
        .toLowerCase()
        .includes(searchString.toLowerCase())
    );
  }, [searchString, notes]);
}

export default useFilterNotes;
