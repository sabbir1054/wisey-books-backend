type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc'; //ascending=asc and Descending=desc
};

export default IPaginationOptions;
