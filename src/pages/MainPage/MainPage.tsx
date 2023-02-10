import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NoteService from '../../API/NoteService';
import { LoadingContext, ModalContext } from '../../context';
import useFetching from '../../hooks/useFetching';
import useFilterNotes from '../../hooks/useFilterNotes';
import useObserver from '../../hooks/useObserver';
import usePaginationNotes from '../../hooks/usePaginationNotes';
import { addAllNotes } from '../../store/reducers/notesReducer';
import { setPage } from '../../store/reducers/paginationReducer';
import NotesSkeleton from '../../componets/UI/skeleton/NotesSkeleton';
import { Pagination } from '../../componets/UI/pagination/Pagination';
import Header from '../../componets/Header/Header';
import Filters from '../../componets/Filters/Filters';
import Footer from '../../componets/UI/footer/Footer';
import NoteList from '../../componets/NoteList/NoteList';
import Modal from '../../componets/Modal/Modal';
import { showError } from '../../store/reducers/notificationReducer';

import stl from './mainPage.module.scss';

function MainPage() {
  const { lazyLoading } = useContext(LoadingContext);
  const { modal } = useContext(ModalContext);

  const { notes } = useSelector((state: IMainState) => state.notes);
  const filter = useSelector((state: IMainState) => state.filter);
  const { limit, page } = useSelector((state: IMainState) => state.pagination);
  const dispatch = useDispatch();
  const lastElement = useRef<HTMLDivElement>(null);

  const [allNotes, pinnedNotes, favoriteNotes] = useFilterNotes(notes, filter);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [paginatedNotes, totalPages] = usePaginationNotes(
    lazyLoading,
    page,
    limit,
    allNotes
  );

  const [fetchNotes, isLoading, noteError] = useFetching(async () => {
    const response = await NoteService.getAll();
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

  useEffect(() => {
    noteError && dispatch(showError(`Ошибка загрузки заметок: ${noteError}`));
  }, [noteError]);

  return (
    <>
      <Header main />
      <main className={stl.main}>
        <Filters favorites={showFavorites} setFavorites={setShowFavorites} />
        <div>
          {isLoading ? (
            <NotesSkeleton />
          ) : (
            <div>
              {showFavorites ? (
                <NoteList notes={favoriteNotes} title="Избранное" />
              ) : (
                <div>
                  {pinnedNotes.length > 0 && (
                    <>
                      <NoteList
                        notes={pinnedNotes}
						counter
                        wrapper
                        title="Закрепленные"
                      />
                      <hr className={stl.line} />
                    </>
                  )}
                  <NoteList
                    notes={paginatedNotes}
                    counter
                    title="Все заметки"
                  />
                  {lazyLoading ? (
                    <div ref={lastElement} />
                  ) : (
                    <Pagination
                      current={page}
                      totalPages={totalPages}
                      changePage={setCurrentPage}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {modal && <Modal />}
      </main>
      <Footer />
    </>
  );
}

export default MainPage;
