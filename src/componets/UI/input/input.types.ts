import { UseFormRegisterReturn } from 'react-hook-form';


type TFieldValues = 'email' | 'password' | 'confirmPassword';

export interface IInputProps extends React.HTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder: string;
  modClass?: string;
  value?: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegisterReturn<TFieldValues>;
}
