import { useContext, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';

import { INote } from './fileForm.types';
import { IModalContext } from '../../interfaces/context.types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import FileService from '../../API/FileService';
import useFetching from '../../hooks/useFetching';
import Loader from '../UI/loader/Loader';
import { setNote } from '../../store/reducers/editNoteReducer';
import IconDeleteTag from '../UI/icons/IconDeleteTag';
import IconAddFile from '../UI/icons/IconAddFile';
import { ModalContext } from '../../context';
import { showError } from '../../store/reducers/notificationReducer';
import { showPopup } from '../../store/reducers/popupReducer';

import stl from './fileForm.module.scss';


function FileForm(): JSX.Element {
  const { setModal } = useContext<IModalContext>(ModalContext);
  const { note } = useTypedSelector((state) => state.editNote);
  const dispatch = useDispatch();

  const [saveFile, isLoadingSave, errSave] = useFetching<FormData>(
    async (formData) => {
      let response;
      if (note?.file) {
        response = await FileService.update(note.file.id, formData);
      } else {
        response = await FileService.upload(formData);
      }

      dispatch(setNote({ ...note, file: response }));
    }
  );

  const [removeFile, isLoadingRemove, errRemove] = useFetching<INote>(
    async (note) => {
      if (note?.file) {
        let newNote = { ...note };
        delete newNote.file;
        dispatch(setNote(newNote));

        await FileService.delete(note.file.id);
      }
    }
  );

  const onDrop = (files: File[]) => {
    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);

    saveFile(formData);
  };

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  const rootClasses = [stl.uploader];
  if (isDragAccept) {
    rootClasses.push(stl.drop);
  }
  if (errSave) {
    rootClasses.push(stl.error);
  }

  const handleRemove = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setModal({
      coords: { x: e.pageX, y: e.pageY },
      body: `«${note.file?.name}»`,
      title: 'Удалить файл?',
      callback: () => removeFile(note),
    });
  };

  useEffect(() => {
    errSave && dispatch(showError(`Ошибка сохранения файла: ${errSave}`));
    errRemove && dispatch(showError(`Ошибка удаления файла: ${errRemove}`));
  }, [errSave, errRemove]);

  return (
    <div>
      <div className={stl.container}>
        {note.file && (
          <div
            onClick={() => {
              console.log('click');
              note.file && dispatch(showPopup(note.file));
            }}
            className={stl.image}
          >
            <img src={note.file.url} alt={note.file.name} />
            <span onClick={handleRemove} className={stl.delete}>
              <IconDeleteTag />
            </span>
          </div>
        )}
        <div {...getRootProps({ className: rootClasses.join(' ') })}>
          <input {...getInputProps()} />
          <IconAddFile />
          {errSave ? (
            <p>Ошибка загрузки файла, попробуйте ещё раз</p>
          ) : isDragAccept ? (
            <p>Отпустите файл</p>
          ) : (
            <p>Добавить файл</p>
          )}
          <p>JPG, JPEG, PNG, GIF</p>
        </div>
        {(isLoadingSave || isLoadingRemove) && <Loader />}
      </div>
    </div>
  );
}

export default FileForm;
