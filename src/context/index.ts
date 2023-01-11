import { createContext } from 'react';

// TODO типизировать контекст правильным образом
export const LoadingContext = createContext<ILoadingType>({} as ILoadingType);

export const AuthContext = createContext<IisAuth>({} as IisAuth);
