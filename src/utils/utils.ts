import dayjs from 'dayjs';

import { INoteModel } from '../interfaces/apiModels.types';


export const EmailReg =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export function createNewNote(): INoteModel {
  return {
    title: '',
    body: '',
    tags: [],
    date: '',
    pinned: false,
    favorite: false,
  };
}

export function prepareNote(note: INoteModel): INoteModel {
  const preparedNote = { ...note, date: dayjs().format() };

  if (!note.title && note.body) {
    preparedNote.title =
      note.body.length < 25 ? note.body : `${note.body.slice(0, 24)}...`;
  }
  if (!note.title && !note.body) {
    preparedNote.title = 'Заголовок';
  }

  return preparedNote;
}

const mounths = ['янв', 'февр', 'апр', 'авг', 'сент', 'окт', 'нояб', 'дек'];

export function prepareDate(date: string): string {
  let formatDate = '';
  if (date) {
    formatDate = dayjs(date)
      .format('D MM YYYY в HH:mm')
      .replace(
        /\s\d+\s/gm,
        (str: string) => ` ${mounths[parseInt(str, 10) - 1]} `
      );
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
    .replace(tagReg, (string: string) => {
      const newTag = string.slice(1, -1);
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

export function getModalPosition(coords?: { x: number; y: number }): {
  x: number;
  y: number;
} | null {
  if (!coords) {
    return null;
  }
  const el = document.documentElement;
  const coodX = el.clientWidth + el.scrollLeft;
  const coordY = el.clientHeight + el.scrollTop;

  let x = coords.x + 40;
  let y = coords.y - 90;

  if (x + 340 > coodX) {
    x = coodX - 340;
  }

  if (y + 180 > coordY) {
    y = coordY - 180;
  }

  return { x, y };
}
