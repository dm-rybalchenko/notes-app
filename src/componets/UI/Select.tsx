export default function Select({
  value,
  onChange,
  defaultValue,
  options,
}: ISelectProps) {
	
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="header__tag-input"
    >
      <option disabled value="">
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
