import Select from 'react-select';
import { IOption, ISelectProps } from './select.types';


export default function CustomSelect({
  value,
  onChange,
  options,
}: ISelectProps): JSX.Element {
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
