import Select from './UI/Select';

export default function SearchForm({ filter, setFilter }: ISearchFormProps) {
	
  return (
    <div className="header__filter">
      <input
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        type="text"
        placeholder="Поиск..."
        className="header__tag-input"
      />
      <Select
        value={filter.sort}
        onChange={(value) => setFilter({ ...filter, sort: value })}
        defaultValue="Сортировка"
        options={[
          { value: 'title', name: 'По заголовку' },
          { value: 'old', name: 'Старые' },
          { value: 'new', name: 'Новые' },
        ]}
      />
    </div>
  );
}
