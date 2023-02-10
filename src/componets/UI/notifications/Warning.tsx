import { useDispatch, useSelector } from 'react-redux';
import { clearWarning } from '../../../store/reducers/notificationReducer';
import IconWarn from '../icons/IconWarn';
import stl from './notifications.module.scss';

export default function Warning() {
  const { warning } = useSelector((state: IMainState) => state.notification);
  const dispatch = useDispatch();

  return (
    <div className={stl.container}>
      <div>
        <IconWarn />
        {warning}
      </div>
      <button onClick={() => dispatch(clearWarning())} className={stl.close}>
        Понятно
      </button>
    </div>
  );
}
