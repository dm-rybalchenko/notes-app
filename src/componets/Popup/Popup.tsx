import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { closePopup } from '../../store/reducers/popupReducer';
import stl from './popup.module.scss';


export default function Popup(): JSX.Element {
  const { popup } = useTypedSelector((state) => state.popup);
  const dispatch = useDispatch();

  const exitPopup = () => {
    document.body.classList.remove('block');
    dispatch(closePopup());
  };

  useEffect(() => {
    document.body.classList.add('block');
  }, []);

  return (
    <div onClick={exitPopup} className={stl.wrapper}>
      <div onClick={(e) => e.stopPropagation()} className={stl.container}>
        <button onClick={exitPopup} className={stl.close}></button>
        <img src={popup?.url} alt={popup?.name} />
      </div>
    </div>
  );
}
