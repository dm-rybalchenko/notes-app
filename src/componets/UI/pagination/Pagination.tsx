import { IPaginationProps } from './pagination.types';

import stl from './pagination.module.scss';
import btnStl from '../buttons/button-small/buttonSmall.module.scss';


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
            onClick={() => changePage(page)}
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
