import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { prepareNote } from '../../utils/utils';
import TagList from '../../componets/TagList/TagList';
import Button from '../../componets/UI/buttons/button-big/ButtonBig';
import NoteService from '../../API/NoteService';
import useFetching from '../../hooks/useFetching';
import Loader from '../../componets/UI/Loader';
import { addNote, updateNote } from '../../store/reducers/notesReducer';
import { highlightTag, removeTag, setDefaultNote } from '../../store/reducers/editNoteReducer';
import FileForm from '../../componets/FileForm';
import NoteForm from '../../componets/NoteForm/NoteForm';

import stl from './editNote.module.scss';


function EditNote() {
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

  return (
    <div className={stl.edit}>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className={stl.upper}>
            <div onClick={handleExit} className={stl.close_btn}></div>
          </div>
          <NoteForm />
          {note.file && (
            <img
              src={note.file.url}
              alt={note.file.name}
              style={{ width: 100, height: 100, objectFit: 'contain' }}
            />
          )}
          <FileForm />
          <TagList
            choose={(tag) => dispatch(highlightTag(tag))}
            remove={(tag) => dispatch(removeTag(tag))}
            current={currentTags}
            tags={note.tags}
            modClass={stl.tags}
          />
          <div className={stl.down}>
            <Button onClick={handleExit} modClass={stl.save_btn}>
              Сохранить
            </Button>
          </div>
        </div>
      )}
      {error && <h1>{error}</h1>}
    </div>
  );
}

export default EditNote;
