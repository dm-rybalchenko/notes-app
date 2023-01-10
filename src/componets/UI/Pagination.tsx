function Pagination({ current, totalPages, changePage }: IPaginationProps) {
	
  return (
    <div className="pagination">
      {totalPages.map((page) => {
        return (
          <div
            onClick={() => changePage(page)}
            className={
              'button pagination__item' + (page === current ? ' active' : '')
            }
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
