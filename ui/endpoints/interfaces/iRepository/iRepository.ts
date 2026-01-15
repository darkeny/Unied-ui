import type { IApiResponse } from "../api/iApiResponse";

export interface IRepository<T> {
  readById(id : number): Promise<IApiResponse<T[]>>;
  readAll(): Promise<IApiResponse<T[]>>;
  create(model: T): Promise<IApiResponse<T[]>>;
  update(model: T): Promise<IApiResponse<T[]>>;
  delete(id: number): Promise<IApiResponse<T[]>>;
}
