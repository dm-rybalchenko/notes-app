import stl from './switcher.module.scss';


export default function Switcher({checked, onChange}: any){

	return (
		<label className={stl.label}>
			<input
            checked={checked}
            onChange={onChange}
            type="checkbox"
			className={stl.checkbox}
          />
		  <span className={stl.switcher}></span>
		</label>
	)
}