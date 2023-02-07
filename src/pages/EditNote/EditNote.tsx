import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { prepareNote } from '../../utils/utils';
import TagList from '../../componets/TagList/TagList';
import Button from '../../componets/UI/buttons/button-big/ButtonBig';
import NoteService from '../../API/NoteService';
import useFetching from '../../hooks/useFetching';
import Loader from '../../componets/UI/loader/Loader';
import { addNote, updateNote } from '../../store/reducers/notesReducer';
import {
  highlightTag,
  removeTag,
  setDefaultNote,
} from '../../store/reducers/editNoteReducer';
import FileForm from '../../componets/FileForm/FileForm';
import NoteForm from '../../componets/NoteForm/NoteForm';
import Modal from '../../componets/Modal/Modal';
import { ModalContext } from '../../context';
import IconBack from '../../componets/UI/icons/IconBack';
import { showError } from '../../store/reducers/notificationReducer';

import stl from './editNote.module.scss';


function EditNote() {
  const { modal } = useContext(ModalContext);
  const { note, currentTags } = useSelector(
    (state: IMainState) => state.editNote
  );
  const dispatch = useDispatch();
  const router = useNavigate();

  const [saveNote, isLoading, error] = useFetching<INote>(
    async (note: INote) => {
      if (note.id) {
        const response = await NoteService.update(note);
        dispatch(updateNote(response));
      } else {
        const response = await NoteService.create(note);
        dispatch(addNote(response));
      }
    }
  );

  const handleExit = async () => {
    if (!note.title && !note.body && !note.file) {
      router('/notes');
      return;
    }

    await saveNote(prepareNote(note));

    if (!error) {
      router('/notes');
      dispatch(setDefaultNote());
    }
  };

  useEffect(() => {
    error && dispatch(showError(`Ошибка сохранения заметки: ${error}`));
  }, [error]);

  return (
    <>
      <header className={stl.header}>
        <Link onClick={handleExit} to="/notes" className={stl.back}>
          <IconBack />
          <span>Все заметки</span>
        </Link>
        <Button onClick={handleExit} modClass={stl.save_btn}>
          Сохранить
        </Button>
      </header>
      <main className={stl.edit}>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <NoteForm />
            <div className={stl.file}>
              <FileForm />
            </div>
            <TagList
              choose={(tag) => dispatch(highlightTag(tag))}
              remove={(tag) => dispatch(removeTag(tag))}
              current={currentTags}
              tags={note.tags}
              modClass={stl.tags}
            />
          </div>
        )}
        {modal && <Modal />}
      </main>
    </>
  );
}

export default EditNote;
