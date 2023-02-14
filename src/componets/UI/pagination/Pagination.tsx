
import { IPaginationProps } from './pagination.types';

import btnStl from '../buttons/button-small/buttonSmall.module.scss';
import stl from './pagination.module.scss';


function Pagination({
  current,
  totalPages,
  changePage,
}: IPaginationProps): JSX.Element {
  const rootClasses = [btnStl.button, stl.page];

  return (
    <div className={stl.pagination}>
      {totalPages.map((page) => {
        const pageClasses = [...rootClasses];
        if (page === current) {
          pageClasses.push(stl.active);
        }

        return (
          <div
            onClick={(): void => changePage(page)}
            className={pageClasses.join(' ')}
            key={page}
          >
            {page}
          </div>
        );
      })}
    </div>
  );
}

export { Pagination };
