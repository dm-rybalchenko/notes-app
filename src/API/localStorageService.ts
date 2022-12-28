export function saveData(notes: INote[]) {
  notes.length && localStorage.setItem('notes', JSON.stringify(notes));
}

export const getData = (): INote[] => {
  let data = [];

  if (localStorage.getItem('notes') !== null) {
    data = JSON.parse(localStorage.getItem('notes') || '[]');
  }

  return data;
};
