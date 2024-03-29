import { useMemo } from 'react';

import { INoteModel } from '../interfaces/apiModels.types';


function usePaginationNotes(
  lazy: boolean,
  page: number,
  limit: number,
  notes: INoteModel[],
): [INoteModel[], number[]] {
  const currentPage = useMemo(() => {
    if (limit === -1) {
      return notes;
    }

    let start = (page - 1) * limit;
    const end = start + limit > notes.length ? notes.length : start + limit;

    if (lazy) {
      start = 0;
    }

    return notes.slice(start, end);
  }, [page, limit, notes, lazy]);

  const totalPages = useMemo(
    () => createPaginationArr(notes.length, limit),
    [notes.length, limit],
  );

  return [currentPage, totalPages];
}

function createPaginationArr(length: number, limit: number): number[] {
  const totalCount = Math.ceil(length / limit);
  const arr = [];
  for (let i = 1; i <= totalCount; i++) {
    arr.push(i);
  }

  return arr;
}

export default usePaginationNotes;
