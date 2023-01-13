import FileService from '../API/FileService';
import useFetching from '../hooks/useFetching';
import Loader from './UI/Loader';


function FileForm({ note, setNote }: any) {
  const [saveFile, isLoading, err] = useFetching(async (e: any) => {
    e.preventDefault();
    const file = e.currentTarget['fileInput'].files[0];
    const newFormData = new FormData();
    newFormData.append('file', file);

    let response;
    if (note?.file) {
      response = await FileService.update(note.file.id, newFormData);
    } else {
      response = await FileService.upload(newFormData);
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

  return (
    <div>
      <p>Добавить файл</p>
      {err && <h1>{err}</h1>}
      {errRemove && <h1>{errRemove}</h1>}
      {isLoading || isLoadingRemove ? (
        <Loader />
      ) : (
        <div>
          <form onSubmit={saveFile} style={{ display: 'flex', gap: 20 }}>
            <input id="fileInput" type="file" />
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
