import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { clearError } from '../../../store/reducers/notificationReducer';
import IconWarn from '../icons/IconWarn';

import stl from './notifications.module.scss';


export default function Error(): JSX.Element {
  const { error } = useTypedSelector((state) => state.notification);
  const dispatch = useDispatch();

  return (
    <div className={`${stl.container} ${stl.error}`}>
      <div>
        <IconWarn />
        {error}
      </div>
      <button
        onClick={(): void => {
          dispatch(clearError());
        }}
        className={stl.close}
      >
        Закрыть
      </button>
    </div>
  );
}
