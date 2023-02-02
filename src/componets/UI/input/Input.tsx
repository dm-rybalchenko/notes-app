import stl from './input.module.scss';


export default function Input({
  value,
  type,
  placeholder,
  onChange,
  register,
  modClass,
}: IInputProps) {
	const rootClasses = [stl.input];

	if(modClass){
		rootClasses.push(modClass)
	}

  return (
    <input
	  {...register}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={rootClasses.join(' ')}
    />
  );
}
