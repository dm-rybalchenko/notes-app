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
      getOptionLabel={(option: IOption): string => option.name}
      getOptionValue={(option: IOption): string => option.value}
      onChange={onChange}
      classNamePrefix="custom-select"
    />
  );
}
