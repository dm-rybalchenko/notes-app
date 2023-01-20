import { SubmitHandler, useForm } from 'react-hook-form';

import FileService from '../API/FileService';
import useFetching from '../hooks/useFetching';
import Loader from './UI/Loader';


function FileForm({ note, setNote }: IFileFormProps) {
  const { register, handleSubmit } = useForm<IFileForm>();

  const [saveFile, isLoadingSave, errSave] = useFetching<FormData>(async (formData) => {
    let response;
    if (note?.file) {
      response = await FileService.update(note.file.id, formData);
    } else {
      response = await FileService.upload(formData);
    }

    setNote({ ...note, file: response });
  });

  const [removeFile, isLoadingRemove, errRemove] = useFetching(async () => {
    if (note?.file) {
      const response = await FileService.delete(note.file.id);

      let newNote = { ...note };
      delete newNote.file;
      setNote(newNote);
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
            <button className="tags__item">Загрузить файл</button>
          </form>
          <button onClick={removeFile} className="tags__item">
            Удалить файл
          </button>
        </div>
      )}
    </div>
  );
}

export default FileForm;
