import { useContext, useEffect, useRef } from 'react';
import { LoadingContext } from '../context';

function useObserver(
  ref: TRefDiv,
  canLoad: boolean,
  isLoading: boolean,
  length: number,
  callback: () => void
) {
  const { lazyLoading } = useContext(LoadingContext);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (isLoading || !lazyLoading) return;

    if (observer.current) observer.current.disconnect();

    let cb = function (entries: IntersectionObserverEntry[]) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };

    observer.current = new IntersectionObserver(cb);
    ref.current && observer.current.observe(ref.current);
  }, [isLoading, length, lazyLoading]);
}

export default useObserver;
