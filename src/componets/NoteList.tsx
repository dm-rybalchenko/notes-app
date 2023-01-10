import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoteService from '../API/NoteService';
import useFetching from '../hooks/useFetching';
import useFilterNotes from '../hooks/useFilterNotes';
import usePaginationNotes from '../hooks/usePaginationNotes';
import { addAllNotes } from '../store/notesReducer';
import { setPage } from '../store/paginationReducer';
import Note from './Note';
import Loader from './UI/Loader';
import { Pagination } from './UI/Pagination';


function NoteList() {
  const { notes } = useSelector((state: IMainState) => state.notes);
  const filter = useSelector((state: IMainState) => state.filter);
  const { limit, page } = useSelector((state: IMainState) => state.pagination);
  const dispatch = useDispatch();

  const filteredNotes = useFilterNotes(notes, filter);
  const [paginatedNotes, totalPages] = usePaginationNotes(
    page,
    limit,
    filteredNotes
  );

  const [fetchNotes, isLoading, noteError] = useFetching(async () => {
    const response = await NoteService.getAllNotes();
    dispatch(addAllNotes(response));
  });

  const setCurrentPage = (page: number) => {
    dispatch(setPage(page));
  };

  useEffect(() => {
    notes.length === 0 && fetchNotes();
  }, []);

  useEffect(() => {
    dispatch(setPage(1));
  }, [limit, filter.query, filter.tags]);

  return (
    <main className="main">
      <div className="main__notes">
        {noteError && <h1>{noteError}</h1>}
        {isLoading ? (
          <Loader />
        ) : (
          paginatedNotes.map((note) => <Note key={note.id} note={note} />)
        )}
      </div>
      <Pagination
        current={page}
        totalPages={totalPages}
        changePage={setCurrentPage}
      />
    </main>
  );
}

export { NoteList };
