import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeModal } from '../../store/reducers/modalReducer';
import { getModalPosition } from '../../utils/utils';

import stl from './modal.module.scss';


export default function Modal() {
  const modal = useSelector((state: IMainState) => state.modal);
  const dispatch = useDispatch();
  const appearCoords = getModalPosition(modal.coords);

  const exitModal = () => {
    document.body.classList.remove('block');
    dispatch(removeModal());
  };

  useEffect(() => {
    document.body.classList.add('block');
    document.addEventListener('click', exitModal, { once: true });
  }, []);

  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ top: appearCoords.y, left: appearCoords.x }}
        className={stl.modal}
      >
        <div className={stl.title}>{modal.title}</div>
        <div className={stl.body}>{modal.body}</div>
        <div className={stl.btns}>
          <button onClick={exitModal} className={stl.cancel}>
            Отменить
          </button>
          <button
            onClick={() => {
              modal.callback();
              exitModal();
            }}
            className={stl.delete}
          >
            Удалить
          </button>
        </div>
      </div>
      <div
        className={stl.scrollbar}
        style={{
          width: window.innerWidth - document.documentElement.clientWidth,
        }}
      ></div>
    </>
  );
}
