import { Pagination, PaginationQuery } from "../models/pagination.model";

const DEFAULT_PAGE_LIMIT = 0;
const DEFAULT_PAGE_NUMBER = 1;

export const getPagination = ({
  limit = DEFAULT_PAGE_LIMIT,
  page = DEFAULT_PAGE_NUMBER,
}: PaginationQuery): Pagination => {
  const limitPositive = Math.abs(limit) || DEFAULT_PAGE_LIMIT;
  const pagePositive = Math.abs(page) || DEFAULT_PAGE_NUMBER;
  const skip = (pagePositive - 1) * limitPositive;

  return {
    skip,
    limit: limitPositive,
  };
};
