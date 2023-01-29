import stl from './input.module.scss';



export default function Input({
  value,
  type,
  placeholder,
  onChange,
  ...props
}: IInputProps) {

  return (
    <input
      {...props}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={stl.input}
    />
  );
}
