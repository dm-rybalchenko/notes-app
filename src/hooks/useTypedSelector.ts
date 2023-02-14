import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { IRootState } from '../interfaces/rootState.types';


export const useTypedSelector: TypedUseSelectorHook<IRootState> = useSelector;
