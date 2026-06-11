export interface ApiErrorBody {
  message: string;
  code?: string;
}

export class ApiError extends Error {
  readonly status: number;
  readonly body?: ApiErrorBody;

  constructor(status: number, message: string, body?: ApiErrorBody) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
