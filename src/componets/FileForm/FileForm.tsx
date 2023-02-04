import { SubmitHandler, useForm } from 'react-hook-form';

import FileService from '../../API/FileService';
import useFetching from '../../hooks/useFetching';
import Loader from '../UI/Loader';
import ButtonSmall from '../UI/buttons/button-small/ButtonSmall';
import { useDispatch, useSelector } from 'react-redux';
import { setNote } from '../../store/reducers/editNoteReducer';

import stl from './fileForm.module.scss';
import IconDeleteTag from '../UI/icons/IconDeleteTag';

function FileForm() {
  const { note } = useSelector((state: IMainState) => state.editNote);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<IFileForm>();

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

  const [removeFile, isLoadingRemove, errRemove] = useFetching(async () => {
    if (note?.file) {
      const response = await FileService.delete(note.file.id);

      let newNote = { ...note };
      delete newNote.file;
      dispatch(setNote(newNote));
    }
  });

  const onSubmit: SubmitHandler<IFileForm> = (data) => {
    const file = data.file[0];
    const formData = new FormData();
    formData.append('file', file);

    saveFile(formData);
  };

  const handleRemove = () => {
	// TODO добавить поп-ап
	removeFile();
  }

  return (
    <div>
      {errSave && <h1>{errSave}</h1>}
      {errRemove && <h1>{errRemove}</h1>}
      {isLoadingSave || isLoadingRemove ? (
        <Loader />
      ) : (
        <div className={stl.container}>
          {note.file && (
            <div className={stl.image}>
              <img src={note.file.url} alt={note.file.name} />
              <span onClick={handleRemove} className={stl.delete}>
                <IconDeleteTag />
              </span>
            </div>
          )}
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register('file')} type="file" />
              <ButtonSmall>Загрузить файл</ButtonSmall>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileForm;
