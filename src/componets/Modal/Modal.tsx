import { useEffect, useContext } from 'react';

import { ModalContext } from '../../context';
import { getModalPosition } from '../../utils/utils';

import { IModalContext } from '../../interfaces/context.types';

import stl from './modal.module.scss';


function Modal(): JSX.Element {
  const { setModal, modal } = useContext<IModalContext>(ModalContext);
  const appearCoords = getModalPosition(modal?.coords);

  const exitModal = (): void => {
    document.body.classList.remove('block');
    setModal(null);
  };

  useEffect(() => {
    document.body.classList.add('block');
    document.addEventListener('click', exitModal, { once: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onClick={(e): void => e.stopPropagation()}
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
          onClick={(): void => {
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
