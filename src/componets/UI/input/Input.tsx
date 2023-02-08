import stl from './input.module.scss';


export default function Input({
  value,
  type,
  placeholder,
  onChange,
  onFocus,
  register,
  modClass,
}: IInputProps) {
	const rootClasses = [stl.input];

	if(modClass){
		rootClasses.push(modClass)
	}

  return (
    <input
      value={value}
      onChange={onChange}
	  onFocus={onFocus}
	  {...register}
      type={type}
      placeholder={placeholder}
      className={rootClasses.join(' ')}
    />
  );
}
