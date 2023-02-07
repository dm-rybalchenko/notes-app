import { createContext } from 'react';


export const LoadingContext = createContext<ILoadingContext>(
  {} as ILoadingContext
);
export const ModalContext = createContext<IModalContext>({} as IModalContext);
