import type { PaginatedResponse } from "./iPaginatedResponse";

export interface IApiResponse<T> {
  status: number;
  message: string;
  isError: boolean;
  data: PaginatedResponse<T> | T | T[] | null;
}
