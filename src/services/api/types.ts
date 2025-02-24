export interface ApiError {
  status: number;
  data: unknown;
  message: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: ApiError;
}
