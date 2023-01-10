import { useMemo } from 'react';


function usePaginationNotes(
  page: number,
  limit: number,
  notes: INote[]
): [INote[], number[]] {
  const currentPage = useMemo(() => {
    if (limit === -1) {
      return notes;
    }

    let start = (page - 1) * limit;
    let end = start + limit > notes.length ? notes.length : start + limit;

    return notes.slice(start, end);
  }, [page, limit, notes]);

  const totalPages = useMemo(
    () => createPaginationArr(notes.length, limit),
    [notes.length, limit]
  );

  return [currentPage, totalPages];
}

function createPaginationArr(length: number, limit: number): number[] {
  let totalCount = Math.ceil(length / limit);
  let arr = [];
  for (let i = 1; i <= totalCount; i++) {
    arr.push(i);
  }

  return arr;
}

export default usePaginationNotes;
