import { useState } from 'react';

import { createNewNote } from '../utils/utils';
import { TagList } from './TagList';
import { TagForm } from './TagForm';
import { Button } from './UI/Button';
import SearchForm from './SearchForm';
import useTags from '../hooks/useTags';


function Header({ notes, newNote, filter, setFilter, setNotes }: IHeaderProps) {
  const [showTagForm, setShowTagForm] = useState(false);
  const [tags, setTags] = useTags(notes);

  const openInput = () => {
    setShowTagForm(true);
  };

  const addTag = (tag: string) => {
    !tags.includes(tag) && setTags((tags) => [...tags, tag]);
  };

  const removeTag = (tag: string) => {
    setTags([...tags.filter((item) => item !== tag)]);
    excludeTag(tag);

    setNotes([
      ...notes.map((note) => {
        return {
          ...note,
          body: note.body.replaceAll(tag, ' ' + tag.slice(2)),
          tags: note.tags.filter((noteTag) => noteTag !== tag),
        };
      }),
    ]);
  };

  const includeTag = (tag: string) => {
    if (filter.tags?.includes(tag)) {
      excludeTag(tag);

    } else {
      setFilter({ ...filter, tags: [...filter.tags, tag] });
    }
  };

  const excludeTag = (tag: string) => {
    if (filter.tags.length) {
      setFilter({
        ...filter,
        tags: [...filter.tags.filter((item) => item !== tag)],
      });
    }
  };

  return (
    <header className="header">
      <div className="header__upper">
        <div className="header__title">Заметки</div>
        <div className="header__add">
          <Button
            onClick={() => newNote(createNewNote())}
            modClass="header__btn"
          >
            Добавить заметку
          </Button>
        </div>
      </div>
      <div className="header__lower">
        <TagList
          choose={includeTag}
          remove={removeTag}
          tags={tags}
          current={filter.tags}
          modClass="header__tags"
        />
        <div className="header__add-tag">
          {showTagForm && <TagForm add={addTag} show={setShowTagForm} />}
          <button onClick={openInput} className="header__tag-btn">
            + Добавить тег
          </button>
        </div>
        <SearchForm filter={filter} setFilter={setFilter} />
      </div>
    </header>
  );
}

export { Header };
