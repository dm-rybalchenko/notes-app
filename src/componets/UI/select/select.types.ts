import { ActionMeta, SingleValue } from 'react-select';


export interface IOption {
  value: string;
  name: string;
}

export interface ISelectProps {
  value: IOption;
  onChange: (
    newValue: SingleValue<IOption>,
    actionMeta: ActionMeta<IOption>
  ) => void;
  options: IOption[];
}
