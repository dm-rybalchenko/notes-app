import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../../store/reducers/notificationReducer';
import IconWarn from '../icons/IconWarn';
import stl from './notifications.module.scss';


export default function Error() {
  const { error } = useSelector((state: IMainState) => state.notification);
  const dispatch = useDispatch();

  return (
    <div className={stl.container + ' ' + stl.error}>
      <IconWarn />
      {error}
      <button
        onClick={() => dispatch(clearError())}
        className={stl.close}
      ></button>
    </div>
  );
}