import Select from 'react-select';


export default function CustomSelect({
  value,
  onChange,
  options,
}: ISelectProps) {
  return (
    <Select<IOption>
      isSearchable={false}
      defaultValue={value}
      options={options}
      getOptionLabel={(option: IOption) => option.name}
      getOptionValue={(option: IOption) => option.value}
      onChange={onChange}
      classNamePrefix="custom-select"
    />
  );
}
