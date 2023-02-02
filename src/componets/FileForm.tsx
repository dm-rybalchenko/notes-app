import { SubmitHandler, useForm } from 'react-hook-form';

import FileService from '../API/FileService';
import useFetching from '../hooks/useFetching';
import Loader from './UI/Loader';
import ButtonSmall from './UI/buttons/button-small/ButtonSmall';
import { useDispatch, useSelector } from 'react-redux';
import { setNote } from '../store/reducers/editNoteReducer';


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

  return (
    <div>
      <p>Добавить файл</p>
      {errSave && <h1>{errSave}</h1>}
      {errRemove && <h1>{errRemove}</h1>}
      {isLoadingSave || isLoadingRemove ? (
        <Loader />
      ) : (
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', gap: 20 }}
          >
            <input {...register('file')} type="file" />
            <ButtonSmall>Загрузить файл</ButtonSmall>
          </form>
          <ButtonSmall onClick={() => removeFile}>Удалить файл</ButtonSmall>
        </div>
      )}
    </div>
  );
}

export default FileForm;
