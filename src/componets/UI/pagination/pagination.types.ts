export interface IPaginationProps {
  current: number;
  totalPages: number[];
  changePage: (page: number) => void;
}
