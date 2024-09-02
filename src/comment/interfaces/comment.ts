export interface IComment {
  id: string;
  text: string;
  user_id: string;
  parent_comment_id?: string;
  file_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Pagination {
  page_size: number;
  cur_page: number;
}

export interface OrderByColumn {
  column: string;
  direction: 'asc' | 'desc';
}

export interface GetCommentsOptions {
  pagination: Pagination;
  order: OrderByColumn;
}
