import { createContext } from 'react';

import { ILoadingContext, IModalContext } from '../interfaces/context.types';


export const LoadingContext = createContext<ILoadingContext>(
  {} as ILoadingContext,
);
export const ModalContext = createContext<IModalContext>({} as IModalContext);
