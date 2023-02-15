import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { prepareNote } from '../../utils/utils';
import TagList from '../../componets/TagList/TagList';
import Button from '../../componets/UI/buttons/button-big/ButtonBig';
import NoteService from '../../API/NoteService';
import useFetching from '../../hooks/useFetching';
import { addNote, updateNote } from '../../store/reducers/notesReducer';
import {
  highlightTag,
  removeTag,
  setDefaultNote,
  setNote,
} from '../../store/reducers/editNoteReducer';
import FileForm from '../../componets/FileForm/FileForm';
import NoteForm from '../../componets/NoteForm/NoteForm';
import Modal from '../../componets/Modal/Modal';
import { ModalContext } from '../../context';
import IconBack from '../../componets/UI/icons/IconBack';
import { showError } from '../../store/reducers/notificationReducer';
import Popup from '../../componets/Popup/Popup';

import { INote } from './editNote.types';

import stl from './editNote.module.scss';


function EditNote(): JSX.Element {
  const { modal } = useContext(ModalContext);
  const { popup } = useTypedSelector((state) => state.popup);
  const { note, currentTags } = useTypedSelector((state) => state.editNote);
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

        if (!note.id && note.file) {
          dispatch(setNote(response));
        }
      }
    }
  );

  const handleExit = async (): Promise<void> => {
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
    if (note.file) {
      saveNote(note);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.file]);

  useEffect(() => {
    if (error) {
      dispatch(showError(`Ошибка сохранения заметки: ${error}`));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <>
      <header className={stl.header}>
        <Link onClick={handleExit} to="/notes" className={stl.back}>
          <IconBack />
          <span>Все заметки</span>
        </Link>
        <Button onClick={handleExit} modClass={stl['save-btn']}>
		{isLoading ? 'Сохраняется...' : 'Сохранить'}
        </Button>
      </header>
      <main className={stl.edit}>
        <div>
          <NoteForm />
          <div className={stl.file}>
            <FileForm />
          </div>
          <TagList
            choose={(tag): void => {
              dispatch(highlightTag(tag));
            }}
            remove={(tag): void => {
              dispatch(removeTag(tag));
            }}
            current={currentTags}
            tags={note.tags}
            modClass={stl.tags}
          />
        </div>
        {modal && <Modal />}
        {popup && <Popup />}
      </main>
    </>
  );
}

export default EditNote;
