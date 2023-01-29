import stl from './pagination.module.scss';
import btnStl from '../buttons/button-big/buttonBig.module.scss';


function Pagination({ current, totalPages, changePage }: IPaginationProps) {
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
