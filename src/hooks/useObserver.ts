import { useContext, useEffect, useRef } from 'react';

import { LoadingContext } from '../context';


function useObserver(
  ref: React.MutableRefObject<HTMLDivElement | null>,
  canLoad: boolean,
  isLoading: boolean,
  length: number,
  callback: () => void
): void {
  const { lazyLoading } = useContext(LoadingContext);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (isLoading || !lazyLoading) return;

    if (observer.current) observer.current.disconnect();

    const cb = function (entries: IntersectionObserverEntry[]): void {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };

    observer.current = new IntersectionObserver(cb);
    ref.current && observer.current.observe(ref.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, length, lazyLoading]);
}

export default useObserver;
