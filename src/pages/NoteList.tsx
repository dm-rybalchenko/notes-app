import { useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoteService from '../API/NoteService';
import { LoadingContext } from '../context';
import useFetching from '../hooks/useFetching';
import useFilterNotes from '../hooks/useFilterNotes';
import useObserver from '../hooks/useObserver';
import usePaginationNotes from '../hooks/usePaginationNotes';
import { addAllNotes } from '../store/notesReducer';
import { setPage } from '../store/paginationReducer';
import Note from '../componets/Note';
import Loader from '../componets/UI/Loader';
import { Pagination } from '../componets/UI/Pagination';
import Header from '../componets/Header';

function NoteList() {
  const { lazyLoading } = useContext(LoadingContext);
  const { notes } = useSelector((state: IMainState) => state.notes);
  const filter = useSelector((state: IMainState) => state.filter);
  const { limit, page } = useSelector((state: IMainState) => state.pagination);
  const dispatch = useDispatch();
  const lastElement = useRef<HTMLDivElement>(null);

  const filteredNotes = useFilterNotes(notes, filter);
  const [paginatedNotes, totalPages] = usePaginationNotes(
    lazyLoading,
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
    !lazyLoading && dispatch(setPage(1));
  }, [limit, filter.query, filter.tags, lazyLoading]);

  useObserver(
    lastElement,
    page < totalPages.length,
    isLoading,
    paginatedNotes.length,
    () => {
      dispatch(setPage(page + 1));
    }
  );

  return (
    <>
      <Header />
      <main className="main">
        <div className="main__notes">
          {noteError && <h1>{noteError}</h1>}
          {isLoading ? (
            <Loader />
          ) : (
            paginatedNotes.map((note) => <Note key={note.id} note={note} />)
          )}
        </div>
        {lazyLoading ? (
          <div ref={lastElement} />
        ) : (
          <Pagination
            current={page}
            totalPages={totalPages}
            changePage={setCurrentPage}
          />
        )}
      </main>
    </>
  );
}

export default NoteList;
