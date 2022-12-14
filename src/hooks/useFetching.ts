import { useState } from 'react';


const useFetching = (callback: TFetchCallback): [TFetchCallback, boolean, string] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = async (arg: INote) => {
    try {
      setIsLoading(true);
      await callback(arg);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};

export default useFetching;
