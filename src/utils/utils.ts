export function toggleBlockBody(status: INote | null) {
  if (status) {
    document.body.classList.add('block');
  } else {
    document.body.classList.remove('block');
  }
}

export function createNewNote(): INote {

  return {
    id: Math.random().toString(36).substring(2, 6),
    title: '',
    body: '',
    tags: [],
	date: ''
  };
}

// Doesn't work in Safary /((?<!>)#\S+\s(?<!>\s))/gm
const RegExpTag =
  /((\s#[0-9а-яА-Яa-zA-Z_-]+\s)|(\s#[0-9а-яА-Яa-zA-Z_-]+&nbsp;\s))/gm;

export function wrapTag(str: string): string[] {
  let tag = '';

  const string = str.replace(RegExpTag, (str: string, p: string) => {
    let newTag = p.slice(0, -1).replace('&nbsp;', '');
    tag = newTag;

    return `<span class="tag">${newTag}</span> `;
  });

  return [tag, string];
}
