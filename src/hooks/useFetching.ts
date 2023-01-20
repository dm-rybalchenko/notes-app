import { useState } from 'react';
import { AxiosError } from 'axios';


const useFetching = <T>(
  callback: (...args: T[]) => void
): [(...args: T[]) => Promise<void>, boolean, string] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetching = async (...args: T[]) => {
    try {
      setIsLoading(true);
	  setError('');
      await callback(...args);
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        setError(e.response.data.message);
      } else if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};

export default useFetching;
