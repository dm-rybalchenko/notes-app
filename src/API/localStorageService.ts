export function saveData(notes: any, tags: any) {
  notes.length && localStorage.setItem('notes', JSON.stringify(notes));
  tags.length && localStorage.setItem('tags', JSON.stringify(tags));
}

export const getData = () => {
  let data = {notes: [], tags: []};

  if (localStorage.getItem('notes') !== null) {
    data.notes = JSON.parse(localStorage.getItem('notes') || '[]');
  }

  if (localStorage.getItem('tags') !== null) {
    data.tags = JSON.parse(localStorage.getItem('tags') || '[]');
  }

  return data;
};
