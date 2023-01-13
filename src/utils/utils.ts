export function createNewNote(): INote {
  return {
    title: '',
    body: '',
    tags: [],
    date: '',
  };
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
