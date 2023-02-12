import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { clearWarning } from '../../../store/reducers/notificationReducer';
import IconWarn from '../icons/IconWarn';
import stl from './notifications.module.scss';


export default function Warning(): JSX.Element {
  const { warning } = useTypedSelector((state) => state.notification);
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
