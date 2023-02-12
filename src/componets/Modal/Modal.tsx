import { useEffect, useContext } from 'react';
import { ModalContext } from '../../context';
import { IModalContext } from '../../interfaces/context.types';
import { getModalPosition } from '../../utils/utils';
import stl from './modal.module.scss';


function Modal(): JSX.Element {
  const { setModal, modal } = useContext<IModalContext>(ModalContext);
  const appearCoords = getModalPosition(modal?.coords);

  const exitModal = () => {
    document.body.classList.remove('block');
    setModal(null);
  };

  useEffect(() => {
    document.body.classList.add('block');
    document.addEventListener('click', exitModal, { once: true });
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{ top: appearCoords?.y, left: appearCoords?.x }}
      className={stl.modal}
    >
      <div className={stl.title}>{modal?.title}</div>
      <div className={stl.body}>{modal?.body}</div>
      <div className={stl.btns}>
        <button onClick={exitModal} className={stl.cancel}>
          Отменить
        </button>
        <button
          onClick={() => {
            modal?.callback();
            exitModal();
          }}
          className={stl.delete}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

export default Modal;
