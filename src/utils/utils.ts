import dayjs from 'dayjs';

export const EmailReg =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export function createNewNote(): INote {
  return {
    title: '',
    body: '',
    tags: [],
    date: '',
    pinned: false,
    favorite: false,
  };
}

export function prepareNote(note: INote): INote {
  let preparedNote = { ...note, date: dayjs().format() };

  if (!note.title && note.body) {
    preparedNote.title =
      note.body.length < 25 ? note.body : note.body.slice(0, 24) + '...';
  }
  if (!note.title && !note.body) {
    preparedNote.title = 'Заголовок';
  }

  return preparedNote;
}

const mounths = ['янв', 'февр', 'апр', 'авг', 'сент', 'окт', 'нояб', 'дек'];

export function prepareDate(date: string) {
  let formatDate = '';
  if (date) {
    formatDate = dayjs(date)
      .format('D MM YYYY в HH:mm')
      .replace(/\s\d+\s/gm, (str: string) => ` ${mounths[parseInt(str) - 1]} `);
  } else {
    formatDate = 'unknown';
  }

  return formatDate;
}

const tagReg = /\s#[\wа-яА-Я-]+\s/gm;
const newLineReg =
  /(\s#[\wа-яА-Я-]+)(<div><br><\/div>|<\/div><div><br><\/div>)/gm;

export function tagController(str: string): { tag: string; content: string } {
  let tag = '';

  let content = str
    .replaceAll('&nbsp;', ' ')
    .replace(/(^|<div>)(#)/gm, '$1 $2')
    .replace(newLineReg, '$1 $2')
    .replace(tagReg, (str: string) => {
      let newTag = str.slice(1, -1);
      tag = newTag;

      return ` ${wrapTag(newTag)}&nbsp;`;
    });

  if (tag) {
    content = content.replace(/<div><br><\/div>$/gm, '');
  }

  return { tag, content };
}

export function wrapTag(tag: string): string {
  return `<span class="tag">${tag}</span>`;
}

export function wrapChosenTag(tag: string): string {
  return `<span class="chosen">${tag}</span>`;
}
