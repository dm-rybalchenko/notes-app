import { ISwitcherProps } from './switcher.types';

import stl from './switcher.module.scss';


export default function Switcher({
  checked,
  onChange,
}: ISwitcherProps): JSX.Element {
  return (
    <label className={stl.label}>
      <input
        checked={checked}
        onChange={onChange}
        type="checkbox"
        className={stl.checkbox}
      />
      <span className={stl.switcher} />
    </label>
  );
}
