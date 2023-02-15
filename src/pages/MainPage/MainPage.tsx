import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import NoteService from '../../API/NoteService';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { LoadingContext, ModalContext } from '../../context';
import useFetching from '../../hooks/useFetching';
import useFilterNotes from '../../hooks/useFilterNotes';
import useObserver from '../../hooks/useObserver';
import usePaginationNotes from '../../hooks/usePaginationNotes';
import { addAllNotes } from '../../store/reducers/notesReducer';
import { setPage } from '../../store/reducers/paginationReducer';
import { showError } from '../../store/reducers/notificationReducer';
import Header from '../../componets/UI/header/Header';
import Account from '../../componets/Account/Account';
import Search from '../../componets/Search/Search';
import Filters from '../../componets/Filters/Filters';
import NoteList from '../../componets/NoteList/NoteList';
import Modal from '../../componets/Modal/Modal';
import Pagination from '../../componets/UI/pagination/Pagination';
import NotesSkeleton from '../../componets/UI/skeleton/NotesSkeleton';
import Footer from '../../componets/UI/footer/Footer';

import stl from './mainPage.module.scss';


function MainPage(): JSX.Element {
  const { lazyLoading } = useContext(LoadingContext);
  const { modal } = useContext(ModalContext);

  const { notes } = useTypedSelector((state) => state.notes);
  const filter = useTypedSelector((state) => state.filter);
  const { limit, page } = useTypedSelector((state) => state.pagination);
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

    // For demonstration skeleton only
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(addAllNotes(response));
  });

  const setCurrentPage = (page: number): void => {
    dispatch(setPage(page));
  };

  useEffect(() => {
    notes.length === 0 && fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    !lazyLoading && dispatch(setPage(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteError]);

  return (
    <>
      <Header main>
        <>
          <Account />
          <Search />
        </>
      </Header>
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
